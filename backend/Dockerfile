FROM node:18

ENV PORT 3000
ENV HOST 0.0.0.0
ENV WEATHER_KEY f119b310ed841b9b8581db412dac6076
ENV NODE_ENV production
ENV CI true

RUN apt-get update -y && apt install openjdk-17-jdk openjdk-17-jre -y

WORKDIR /api

# Just copy the package* files first, so we can cache the 'npm ci' layer
COPY ./package*.json ./
RUN npm ci && node ./node_modules/@rmlio/rmlmapper-java-wrapper/lib/download-latest-rmlmapper.js

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "start"]
