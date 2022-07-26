// Require the framework and instantiate it
import 'dotenv/config';

import Fastify from 'fastify'
import cors from '@fastify/cors';

// Import method to convert JSON to linked-data (JSON-LD)
import {convertData} from './rml-mapper.js'

// Run the server!
const start = async () => {
    const fastify = Fastify({
        logger: true,
    })

    // Add cors
    await fastify.register(cors, { origin: '*' });

    // Other possible route
    fastify.get('/health', (_, reply) => reply.status(200).send('ok'));

    // Route for providing linked weather data
    fastify.get('/weather/:city', {
        schema: {
            params: {
                type: "object",
                properties: {
                    city: {
                        type: "string"
                    }
                },
                required: ['city']
            }
        }}, async (request, reply) => {

        // Retrieve the latitude and longitude of a city to feed to the open-weather API
        const locationRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${request.params.city}&format=json`);
        const locationJson = await locationRes.json();

        // Check if the response is an array
        if(!Array.isArray((locationJson))) {
            return reply.status(500);
        }
        // Make sure there is data in the response
        if(locationJson.length === 0) {
            return reply.status(404);
        }

        // Worth pointing out that we pick the first entry in the array of options as it
        // is most likely to be what the end-user was looking forward.
        const { lat, lon } = locationJson[0]

        // Retrieve the weather data in JSON format.
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&appid=${process.env.WEATHER_KEY}`);
        const weatherJson = await weatherRes.json();
        // Convert the JSON to JSON-LD
        const weather_JsonLD = await convertData(weatherJson);

        // Serve the JSON-LD back.
        return reply
            .status(200)
            .header('content-type', 'application/ld+json')
            .send(weather_JsonLD.output);
    })

    // Define what port the server listens to
    await fastify.listen({
        port: process.env.PORT,
        host: process.env.HOST
    })
}

start().catch((error) => {
    console.error(error);
    process.exit(1)
})