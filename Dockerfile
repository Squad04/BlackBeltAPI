FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV development
EXPOSE 3000
CMD ["node", "dist/shared/http/server.js"]
