# Multi-stage build for production
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm run install-all

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package files for production
COPY package*.json ./
COPY server/package*.json ./server/

# Install only production dependencies
RUN npm install --only=production && \
    cd server && npm install --only=production

# Copy built React app and server code
COPY --from=builder /app/client/build ./client/build
COPY server ./server

# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start the server
CMD ["npm", "start"] 