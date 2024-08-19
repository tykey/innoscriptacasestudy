FROM node:latest

WORKDIR /docker
COPY public/ /docker/public
COPY src /docker/src
COPY package.json /docker/
COPY webpack.config.js /docker/
COPY react-app.d.ts /docker/
COPY tsconfig.json /docker/

RUN npm install

CMD ["npm", "start"]