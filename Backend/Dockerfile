FROM node:lts-alpine3.19

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

USER node

RUN npm install

EXPOSE 5000

CMD [ "node", "index.js" ]