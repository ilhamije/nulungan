# Use an official node runtime as a parent image
FROM node:latest

WORKDIR /home/node/app/

# Install dependencies
COPY package.json /home/node/app/

RUN npm install --legacy-peer-deps --unsafe-perm=true --allow-root

# Add rest of the client code
COPY . /home/node/app/

EXPOSE 3000

CMD npm start
