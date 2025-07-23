import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { InputText } from "../components/InputText"; // Import your InputText component

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      alert("Login successful!");
      // Add your actual login logic here
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <PageContainer>
      <Header>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/register">Register</NavLink>
      </Header>

      <LoginContainer>
        <Logo>Logo</Logo>
        <Title>Login</Title>
        <Subtitle>sign into your account</Subtitle>

        <FormContainer>
          <InputText
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            img="https://cdn-icons-png.flaticon.com/512/847/847969.png" // User icon
          />

          <InputText
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            img="https://cdn-icons-png.flaticon.com/512/3064/3064155.png" // Lock icon
          />

          <LoginButton onClick={handleLogin}>Login</LoginButton>

          <ForgotPassword onClick={handleForgotPassword}>
            I forgot my password. Click Here to reset.
          </ForgotPassword>

          <RegisterButton onClick={handleRegister}>
            Register New Account
          </RegisterButton>
        </FormContainer>
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;

// Styled Components (remove the duplicate InputText style)
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavLink = styled.a`
  margin-left: 20px;
  color: #333;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #0066cc;
    text-decoration: underline;
  }
`;

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
  color: #333;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`;

const LoginButton = styled.button`
  padding: 12px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;

  &:hover {
    background-color: #0052a3;
  }
`;

const ForgotPassword = styled.button`
  background: none;
  border: none;
  color: #0066cc;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 10px;
  padding: 0;

  &:hover {
    color: #004080;
  }
`;

const RegisterButton = styled.button`
  padding: 12px;
  background-color: white;
  color: #0066cc;
  border: 1px solid #0066cc;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 20px;

  &:hover {
    background-color: #f0f7ff;
  }
`;
