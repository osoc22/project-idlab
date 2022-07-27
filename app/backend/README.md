# Backend

## Description

The backend server's goal is to convert data in non linked format to JSON-LD or turtle representations. This is achieved by using [Rml.io](https://rml.io/) which allows the user to write RML rules that can automatically convert documents to RDF. Currently the backend supports the conversion of weather data from [OpenWeatherMap](https://openweathermap.org/api) to JSON-LD.

The endpoint can be accessed at ``` localhost:3000/weather/$cityName$ ```

The backend server will retrieve the longitude and latitude of the city name using the [OpenStreetMap](https://www.openstreetmap.org/) API which then get passed to the weather endpoint. The result is converted to RDF using a [JavaScript wrapper](https://github.com/RMLio/rmlmapper-java-wrapper-js) over [RmlMapper](https://github.com/RMLio/rmlmapper-java). The latest version of the JAR file for the RmlMapper can be downloaded using the following command: 

```node ./node_modules/@rmlio/rmlmapper-java-wrapper/lib/download-latest-rmlmapper.js```.

The RML rules used to convert the data can be found at [/mappings/final_RML.ttl](https://github.com/osoc22/project-idlab/blob/master/app/backend/mappings/final_RML.ttl). This specification has been generated using [Yarrrml](https://rml.io/yarrrml/) which allowed us to use YAML to easily generate the rules, and then convert them to turtle.

## Dependencies

- The backend server runs using [Node.js 18](https://nodejs.org/ru/blog/announcements/v18-release-announce/) (needed for the built-in fetch functionality) and [Fastify](https://www.fastify.io/). This allows us to have a lightweight API.
- The conversion to RDF is done using RmlMapper which is built in Java, and as a consequence we need to have [JDK18](https://www.oracle.com/java/technologies/javase/jdk18-archive-downloads.html) as a dependency for running the application.

## Local installation

To install and run the server locally, follow the steps below:

```bash
cp .env .env.example # fill in the environment variables
node ./node_modules/@rmlio/rmlmapper-java-wrapper/lib/download-latest-rmlmapper.js # Download the latest version of the JAR file
npm i
npm run start
```

## Deploy

The server is currently deployed using DigitalOpen App Platform and can be accessed at: https://idlab.osoc.be/weather/Brussels.

The same docker image used to deploy the server can be used locally too. To do that, follow the instructions below:

```bash
docker build . -t powerful-personal-data
docker run -p 127.0.0.1:3000:3000 powerful-personal-data # you can now access the service by going to http://127.0.0.1:3000
```
