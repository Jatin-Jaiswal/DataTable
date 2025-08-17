# Use an official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose the port your app runs on (change if needed)
EXPOSE 3000

# Start the application (adjust if your entry point is different)
CMD ["npm", "start"]
