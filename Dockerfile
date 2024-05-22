FROM node:18
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY wait-for-it.sh ./
RUN npm install
RUN chmod +x wait-for-it.sh
COPY . .
RUN npm run build
ENV NODE_ENV development
EXPOSE 3000
CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "run", "setup:db:start"]
