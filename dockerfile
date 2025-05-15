# Step 1: Build stage
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port for Vite dev server
EXPOSE 5173

# Run the Vite dev server
CMD ["npm", "run", "dev"]
