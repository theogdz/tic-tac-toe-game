import React from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const GameId = styled.div`
  background: #f7fafc;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #4a5568;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
`;

const StatusMessage = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const PlayerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
`;

const PlayerBadge = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  background: ${props => {
    if (props.isCurrent) return 'linear-gradient(135deg, #48bb78, #38a169)';
    if (props.player === 'X') return 'linear-gradient(135deg, #667eea, #5a67d8)';
    return 'linear-gradient(135deg, #f56565, #e53e3e)';
  }};
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const GameStatus = ({ currentPlayer, winner, isDraw, player, gameId }) => {
  const getStatusMessage = () => {
    if (winner) {
      return winner === player ? '🎉 You won!' : '😔 You lost!';
    }
    if (isDraw) {
      return '🤝 It\'s a draw!';
    }
    if (currentPlayer === player) {
      return 'Your turn';
    }
    return 'Waiting for opponent...';
  };

  return (
    <StatusContainer>
      <GameId>
        Game ID: {gameId}
      </GameId>
      
      <StatusMessage>
        {getStatusMessage()}
      </StatusMessage>

      <PlayerInfo>
        <div>
          <div style={{ fontSize: '0.9rem', color: '#4a5568', marginBottom: '0.25rem' }}>
            You are:
          </div>
          <PlayerBadge player={player}>
            Player {player}
          </PlayerBadge>
        </div>
        
        <div>
          <div style={{ fontSize: '0.9rem', color: '#4a5568', marginBottom: '0.25rem' }}>
            Current turn:
          </div>
          <PlayerBadge 
            player={currentPlayer} 
            isCurrent={true}
          >
            Player {currentPlayer}
          </PlayerBadge>
        </div>
      </PlayerInfo>
    </StatusContainer>
  );
};

export default GameStatus; 