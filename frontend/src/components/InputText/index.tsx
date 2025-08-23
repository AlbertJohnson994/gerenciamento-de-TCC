import React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  img?: string;
  autoComplete?: string;
}

export const InputText: React.FC<Props> = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  img,
  autoComplete 
}) => (
  <Wrapper>
    <Label>{label}</Label>
    <InputContainer>
      {img && <Icon src={img} alt="" />}
      <Input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        autoComplete={autoComplete} 
        hasIcon={!!img}
        required 
      />
    </InputContainer>
  </Wrapper>
);

const Wrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Icon = styled.img`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
`;

const Input = styled.input<{ hasIcon: boolean }>`
  width: 100%;
  padding: ${props => props.hasIcon ? '10px 14px 10px 40px' : '10px 14px'};
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #0066cc;
  }

  &::placeholder {
    color: #999;
  }
`;