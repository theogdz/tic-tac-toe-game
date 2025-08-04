import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import GameBoard from './components/GameBoard';
import GameLobby from './components/GameLobby';
import GameStatus from './components/GameStatus';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
`;

const GameContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 90%;
`;

const Title = styled.h1`
  color: #2d3748;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const socket = io();

function App() {
  const [gameState, setGameState] = useState({
    gameId: null,
    player: null,
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    gameStarted: false
  });

  useEffect(() => {
    socket.on('gameCreated', ({ gameId, player }) => {
      setGameState(prev => ({
        ...prev,
        gameId,
        player,
        gameStarted: false
      }));
    });

    socket.on('gameJoined', ({ gameId, player }) => {
      setGameState(prev => ({
        ...prev,
        gameId,
        player,
        gameStarted: true
      }));
    });

    socket.on('gameStart', (game) => {
      setGameState(prev => ({
        ...prev,
        board: game.board,
        currentPlayer: game.currentPlayer,
        gameStarted: true
      }));
    });

    socket.on('gameUpdate', (game) => {
      setGameState(prev => ({
        ...prev,
        board: game.board,
        currentPlayer: game.currentPlayer,
        winner: game.winner,
        isDraw: game.isDraw
      }));
    });

    socket.on('gameError', (error) => {
      alert(error);
    });

    return () => {
      socket.off('gameCreated');
      socket.off('gameJoined');
      socket.off('gameStart');
      socket.off('gameUpdate');
      socket.off('gameError');
    };
  }, []);

  const createGame = () => {
    socket.emit('createGame');
  };

  const joinGame = (gameId) => {
    socket.emit('joinGame', gameId);
  };

  const makeMove = (index) => {
    if (gameState.player === gameState.currentPlayer && !gameState.winner && !gameState.isDraw) {
      socket.emit('makeMove', {
        gameId: gameState.gameId,
        index,
        player: gameState.player
      });
    }
  };

  const resetGame = () => {
    socket.emit('resetGame', gameState.gameId);
  };

  return (
    <AppContainer>
      <GameContainer>
        <Title>Tic-tac-toe</Title>
        
        {!gameState.gameId ? (
          <GameLobby onCreateGame={createGame} onJoinGame={joinGame} />
        ) : (
          <>
            <GameStatus 
              currentPlayer={gameState.currentPlayer}
              winner={gameState.winner}
              isDraw={gameState.isDraw}
              player={gameState.player}
              gameId={gameState.gameId}
            />
            <GameBoard 
              board={gameState.board}
              onMove={makeMove}
              currentPlayer={gameState.currentPlayer}
              player={gameState.player}
              winner={gameState.winner}
              isDraw={gameState.isDraw}
            />
            {(gameState.winner || gameState.isDraw) && (
              <button 
                onClick={resetGame}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Play Again
              </button>
            )}
          </>
        )}
      </GameContainer>
    </AppContainer>
  );
}

export default App; 