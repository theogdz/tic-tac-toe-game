import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.primary ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white'};
  color: ${props => props.primary ? 'white' : '#2d3748'};
  border: ${props => props.primary ? 'none' : '2px solid #e2e8f0'};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const JoinSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #667eea;
  }
`;

const AvailableGames = styled.div`
  margin-top: 1rem;
`;

const GameItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    border-color: #667eea;
  }
`;

const GameLobby = ({ onCreateGame, onJoinGame }) => {
  const [gameId, setGameId] = useState('');
  const [availableGames, setAvailableGames] = useState([]);

  useEffect(() => {
    fetchAvailableGames();
    const interval = setInterval(fetchAvailableGames, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAvailableGames = async () => {
    try {
      const response = await fetch('/api/games');
      const games = await response.json();
      setAvailableGames(games);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleJoinGame = () => {
    if (gameId.trim()) {
      onJoinGame(gameId.trim());
    }
  };

  const handleJoinFromList = (gameId) => {
    onJoinGame(gameId);
  };

  return (
    <LobbyContainer>
      <Button primary onClick={onCreateGame}>
        Create New Game
      </Button>

      <JoinSection>
        <h3 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>Join Existing Game</h3>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Input
            type="text"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJoinGame()}
          />
          <Button onClick={handleJoinGame}>
            Join
          </Button>
        </div>

        {availableGames.length > 0 && (
          <AvailableGames>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#4a5568' }}>Available Games:</h4>
            {availableGames.map((game) => (
              <GameItem
                key={game.gameId}
                onClick={() => handleJoinFromList(game.gameId)}
              >
                <span>Game ID: {game.gameId}</span>
                <span style={{ color: '#667eea', fontWeight: '500' }}>
                  {game.players}/2 players
                </span>
              </GameItem>
            ))}
          </AvailableGames>
        )}
      </JoinSection>
    </LobbyContainer>
  );
};

export default GameLobby; 