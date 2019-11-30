FROM node

WORKDIR /app

RUN apt update && apt upgrade -y

RUN npm i -g @adonisjs/cli

COPY package-*.json /app

RUN npm install

EXPOSE 5000

ENTRYPOINT ["adonis", "migration:run", "adonis", "serve"]
