FROM node:lts-alpine

WORKDIR /api

COPY node_modules node_modules
COPY dist .

RUN npm rebuild 

USER node

CMD ["node", "app/http/index.js"]
