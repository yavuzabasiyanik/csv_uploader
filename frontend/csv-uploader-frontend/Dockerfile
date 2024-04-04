# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use an official Nginx image as a parent image
FROM nginx:stable-alpine

# Copy the built React application to the Nginx html directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]