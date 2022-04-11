FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install --force
RUN npm run build

USER node

CMD ["node", "dist/app/http/index.js"]
