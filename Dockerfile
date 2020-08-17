FROM node:12
WORKDIR /Users/jun/node/projects/10-Likey-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000
CMD [ "node", "server.js" ]
