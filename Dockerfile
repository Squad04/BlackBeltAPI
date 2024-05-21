FROM node:18
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV development
EXPOSE 3000
CMD [ "npm", "run", "setup:db:start" ]
