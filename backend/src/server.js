// Require the framework and instantiate it
import 'dotenv/config';

import Fastify from 'fastify'
import cors from '@fastify/cors';

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


        if(!Array.isArray((locationJson))) {
            return reply.status(500);
        }

        if(locationJson.length === 0) {
            return reply.status(404);
        }

        // First match is probably the best so we pick that
        const { lat, lon } = locationJson[0]

        console.log(lat,lon)

        // Retrieve the weather data in JSON format.
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&appid=${process.env.WEATHER_KEY}`);
        const weatherJson = await weatherRes.json();
        const weather_JsonLD = await convertData(weatherJson);
        //console.log(weather_JsonLD)
        return reply
            .status(200)
            .header('content-type', 'application/ld+json')
            .send(weather_JsonLD.output);
        //return weather_JsonLD.output
    })

    await fastify.listen({
        port: process.env.PORT,
        host: process.env.HOST
    })
}

start().catch((error) => {
    console.error(error);
    process.exit(1)
})