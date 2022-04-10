FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install --force && npm run build

USER node

CMD ["node", "app/http/index.js"]
