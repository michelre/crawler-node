FROM node:latest

COPY . /srv/crawler

WORKDIR /srv/crawler

RUN npm install

ENTRYPOINT ["node", "/srv/crawler/index.js"]
