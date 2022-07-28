FROM node:16.9.0 as build

WORKDIR /app

RUN apt-get update && apt-get install -y mecab libmecab-dev mecab-ipadic-utf8

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
