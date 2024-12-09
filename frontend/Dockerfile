# Use a stable Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first to leverage caching
COPY package.json package-lock.json ./

# Set a mirror for npm registry and increase timeout
RUN npm config set registry https://registry.npmjs.org && \
    npm config set timeout 600000 && \
    npm cache clean --force && \
    npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]


