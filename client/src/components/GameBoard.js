import React from 'react';
import styled from 'styled-components';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 2rem 0;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;

const Square = styled.button`
  width: 80px;
  height: 80px;
  background: ${props => props.isWinning ? 'linear-gradient(135deg, #48bb78, #38a169)' : 'white'};
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 2rem;
  font-weight: 700;
  cursor: ${props => props.canClick ? 'pointer' : 'not-allowed'};
  color: ${props => {
    if (props.value === 'X') return '#667eea';
    if (props.value === 'O') return '#f56565';
    return '#a0aec0';
  }};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: ${props => props.canClick ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.canClick ? '0 6px 12px rgba(0, 0, 0, 0.15)' : '0 4px 6px rgba(0, 0, 0, 0.1)'};
  }

  &:active {
    transform: ${props => props.canClick ? 'translateY(0)' : 'none'};
  }
`;

const GameBoard = ({ board, onMove, currentPlayer, player, winner, isDraw }) => {
  const canClick = (index) => {
    return !board[index] && player === currentPlayer && !winner && !isDraw;
  };

  const getWinningLine = () => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return lines[i];
      }
    }
    return null;
  };

  const winningLine = getWinningLine();

  return (
    <BoardContainer>
      {board.map((value, index) => (
        <Square
          key={index}
          onClick={() => canClick(index) && onMove(index)}
          value={value}
          canClick={canClick(index)}
          isWinning={winningLine && winningLine.includes(index)}
        >
          {value}
        </Square>
      ))}
    </BoardContainer>
  );
};

export default GameBoard; 