FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

RUN npm install pm2 -g

CMD ["pm2-runtime", "dist/server.js"]
