# Use a lightweight Node.js environment
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (optimizes caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the rest of your project files into the container
COPY . .

# Expose the default Vite port
EXPOSE 5173

# Start the Vite server and expose it to the host network
CMD ["npm", "run", "dev", "--", "--host"]