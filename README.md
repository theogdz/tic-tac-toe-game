# Tic-tac-toe Game

A modern, real-time multiplayer tic-tac-toe game built with React, Node.js, and Socket.IO. Features a beautiful UI with smooth animations and real-time game updates.

## Features

- 🎮 **Real-time multiplayer gameplay** using Socket.IO
- 🎨 **Modern, responsive UI** with smooth animations
- 📱 **Mobile-friendly design** that works on all devices
- 🔄 **Game lobby system** for creating and joining games
- 🏆 **Win detection** with highlighted winning combinations
- 🔄 **Game reset functionality** for multiple rounds
- 🐳 **Docker support** for easy deployment
- ⚡ **Fast and lightweight** with optimized performance

## Tech Stack

- **Frontend**: React 18, Styled Components
- **Backend**: Node.js, Express, Socket.IO
- **Deployment**: Docker, Docker Compose
- **Styling**: Modern CSS with gradients and animations

## Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/theogdz/tic-tac-toe-game.git
   cd tic-tac-toe-game
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Open your browser**
   Navigate to `http://localhost:5000`

### Manual Setup

1. **Install dependencies**
   ```bash
   npm run install-all
   ```

2. **Development mode**
   ```bash
   npm run dev
   ```

3. **Production build**
   ```bash
   npm run build
   npm start
   ```

## How to Play

1. **Create a Game**: Click "Create New Game" to start a new game session
2. **Share Game ID**: Share the generated Game ID with your opponent
3. **Join Game**: Your opponent can join using the Game ID or by selecting from available games
4. **Play**: Take turns placing X's and O's on the board
5. **Win**: Get three in a row (horizontally, vertically, or diagonally) to win
6. **Play Again**: Click "Play Again" to start a new round

## Game Rules

- Players take turns placing their mark (X or O) on the board
- The first player to get three of their marks in a row wins
- If all squares are filled and no player has won, the game is a draw
- Player X always goes first

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/games` - List available games
- `GET /*` - Serve React application

## Socket.IO Events

### Client to Server
- `createGame` - Create a new game
- `joinGame` - Join an existing game
- `makeMove` - Make a move on the board
- `resetGame` - Reset the current game

### Server to Client
- `gameCreated` - Game created successfully
- `gameJoined` - Successfully joined a game
- `gameStart` - Game has started
- `gameUpdate` - Game state updated
- `gameError` - Error occurred

## Development

### Project Structure
```
tic-tac-toe-game/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js           # Main server file
│   └── package.json
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
└── package.json           # Root package.json
```

### Available Scripts

- `npm run dev` - Start development server (both frontend and backend)
- `npm run build` - Build React app for production
- `npm start` - Start production server
- `npm run install-all` - Install all dependencies

## Deployment

### Docker Deployment

1. **Build the image**
   ```bash
   docker build -t tic-tac-toe .
   ```

2. **Run the container**
   ```bash
   docker run -p 5000:5000 tic-tac-toe
   ```

### Docker Compose Deployment

```bash
docker-compose up -d
```

### Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub. 