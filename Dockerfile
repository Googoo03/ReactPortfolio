# Use official Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Build TypeScript (if you have a build step)
RUN npm run build

# Expose a port (adjust to your app)
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]