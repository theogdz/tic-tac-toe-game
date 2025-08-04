const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Game state
const games = new Map();

// Game logic
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('createGame', () => {
    const gameId = Math.random().toString(36).substring(2, 8);
    games.set(gameId, {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      players: [socket.id],
      winner: null,
      isDraw: false
    });
    socket.join(gameId);
    socket.emit('gameCreated', { gameId, player: 'X' });
  });

  socket.on('joinGame', (gameId) => {
    const game = games.get(gameId);
    if (game && game.players.length < 2) {
      game.players.push(socket.id);
      socket.join(gameId);
      socket.emit('gameJoined', { gameId, player: 'O' });
      io.to(gameId).emit('gameStart', game);
    } else {
      socket.emit('gameError', 'Game not found or full');
    }
  });

  socket.on('makeMove', ({ gameId, index, player }) => {
    const game = games.get(gameId);
    if (game && game.currentPlayer === player && !game.winner && !game.isDraw) {
      if (game.board[index] === null) {
        game.board[index] = player;
        
        const winner = calculateWinner(game.board);
        if (winner) {
          game.winner = winner;
        } else if (!game.board.includes(null)) {
          game.isDraw = true;
        } else {
          game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
        }
        
        io.to(gameId).emit('gameUpdate', game);
      }
    }
  });

  socket.on('resetGame', (gameId) => {
    const game = games.get(gameId);
    if (game) {
      game.board = Array(9).fill(null);
      game.currentPlayer = 'X';
      game.winner = null;
      game.isDraw = false;
      io.to(gameId).emit('gameUpdate', game);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Clean up games when players disconnect
    games.forEach((game, gameId) => {
      game.players = game.players.filter(id => id !== socket.id);
      if (game.players.length === 0) {
        games.delete(gameId);
      }
    });
  });
});

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Tic-tac-toe server is running' });
});

app.get('/api/games', (req, res) => {
  const availableGames = Array.from(games.entries())
    .filter(([_, game]) => game.players.length < 2)
    .map(([gameId, game]) => ({ gameId, players: game.players.length }));
  res.json(availableGames);
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 