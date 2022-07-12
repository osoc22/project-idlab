FROM node:18

ENV NODE_ENV production
ENV CI true

WORKDIR /api

COPY ./package*.json ./
RUN npm ci

COPY --chown=node:node . ./

EXPOSE 3000

CMD ["npm", "run", "start"]