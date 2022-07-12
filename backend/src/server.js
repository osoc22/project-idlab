// Require the framework and instantiate it
import 'dotenv/config';

import Fastify from 'fastify'
import cors from '@fastify/cors';

// Run the server!
const start = async () => {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, { origin: '*' });

    fastify.get('/health', (_, reply) => reply.status(200).send('ok'));

    // Declare a route
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
        const locationRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${request.params.city}&format=json`);
        const locationJson = await locationRes.json();

        if(!Array.isArray((locationJson))) {
            return reply.status(500);
        }

        if(locationJson.length === 0) {
            return reply.status(404);
        }

        const { lat, lon } = locationJson[0]

        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&appid=${process.env.WEATHER_KEY}`);
        return reply
            .status(200)
            .header('content-type', 'application/ld+json')
            .send(weatherRes);
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