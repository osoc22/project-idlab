FROM node:18

ENV PORT 3000
ENV HOST 0.0.0.0
ENV NODE_ENV production
ENV CI true

WORKDIR /api

# Just copy the package* files first, so we can cache the 'npm ci' layer
COPY ./package*.json ./
RUN npm ci

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "start"]
