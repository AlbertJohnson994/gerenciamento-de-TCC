import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Por favor, insira seu e-mail.");
      return;
    }

    // Aqui você chamaria a API para enviar o link de reset
    setMessage(`Se houver uma conta para ${email}, um link foi enviado.`);
    setEmail("");
  };

  return (
    <PageContainer>
      <FormContainer>
        <Header>Forgot Password</Header>
        <Form onSubmit={handleSubmit}>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <Button type="submit">Send link</Button>
        </Form>
        {message && <Message>{message}</Message>}
        <BackLink onClick={() => navigate("/login")}>Back to login</BackLink>
      </FormContainer>
    </PageContainer>
  );
};

export default ForgotPasswordPage;

// Styled-components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 360px;
  text-align: center;
`;

const Header = styled.h2`
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-weight: 600;
  text-align: left;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #0069d9;
  }
`;

const Message = styled.p`
  margin-top: 12px;
  color: green;
  font-size: 14px;
`;

const BackLink = styled.p`
  margin-top: 16px;
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
