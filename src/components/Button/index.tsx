import React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({ text, onClick, disabled = false }) => (
  <StyledButton onClick={onClick} disabled={disabled}>{text}</StyledButton>
);

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
