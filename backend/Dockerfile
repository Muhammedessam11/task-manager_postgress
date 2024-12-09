FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm config set timeout 600000 && npm cache clean --force && npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

