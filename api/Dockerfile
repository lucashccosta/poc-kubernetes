FROM node:20.2.0

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . . 
EXPOSE 9080
CMD ["yarn", "run", "start"]