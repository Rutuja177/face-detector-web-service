# Use the official Node.js image as base
FROM node:14

# Set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["node", "src/server.js"]