FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm cache clean --force && npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

