#!/bin/bash

# Tic-tac-toe Game Deployment Script
# This script builds and deploys the tic-tac-toe game using Docker

set -e

echo "🎮 Tic-tac-toe Game Deployment"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Stop and remove existing containers
echo "🛑 Stopping existing containers..."
sudo docker-compose down 2>/dev/null || true

# Build and start the application
echo "🔨 Building and starting the application..."
sudo docker-compose up --build -d

# Wait for the application to start
echo "⏳ Waiting for the application to start..."
sleep 10

# Check if the application is running
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Application is running successfully!"
    echo "🌐 Open your browser and navigate to: http://localhost:5000"
    echo ""
    echo "📋 Available commands:"
    echo "  - View logs: sudo docker-compose logs -f"
    echo "  - Stop application: sudo docker-compose down"
    echo "  - Restart application: sudo docker-compose restart"
else
    echo "❌ Application failed to start. Check logs with: sudo docker-compose logs"
    exit 1
fi 