FROM node:18

ENV PORT 3000
ENV HOST 0.0.0.0
ENV NODE_ENV production
ENV CI true

WORKDIR /api

COPY ./package*.json ./
RUN npm ci

COPY --chown=node:node . ./

EXPOSE 3000

CMD ["npm", "run", "start"]
