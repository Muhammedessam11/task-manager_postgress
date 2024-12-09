# Use a lightweight Node.js image
FROM node:16-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage caching
COPY package.json ./ 
COPY package-lock.json ./ || echo "No package-lock.json found, continuing without it."

# Install dependencies
RUN npm config set timeout 600000 && npm cache clean --force && npm install

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]



