# Backend

## Installation

```bash
cp .env .env.example # fill in the environment variables
node ./node_modules/@rmlio/rmlmapper-java-wrapper/lib/download-latest-rmlmapper.js
npm i
npm run start
```

## Deploy

**Locally:**

```bash
docker build . -t powerful-personal-data
docker run -p 127.0.0.1:3000:3000 powerful-personal-data # you can now access the service by going to http://127.0.0.1:3000
```

**DigitalOcean App Platform:**

```

```
