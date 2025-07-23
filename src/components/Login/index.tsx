import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { InputText } from "../InputText";
import { Button } from "../Button";
import { login } from "../../store/authSlice";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (email && password) {
      dispatch(
        login({
          email,
          name: "Albert Johnson",
          role: email.includes("coordinator") ? "coordinator" : "student",
        })
      );
      alert("Login successful!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleRegister = () => {
    alert("Redirecionar para a página de cadastro...");
    // Ex: navegação com React Router: navigate('/register')
  };

  return (
    <Container>
      <FormBox>
        <Title>Login</Title>
        <InputText
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@domain.com"
          img = "https://cdn-icons-png.flaticon.com/512/561/561127.png"
          autoComplete="email"
        />
        <InputText
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          img = "https://cdn-icons-png.flaticon.com/512/561/561127.png"
          autoComplete="current-password"
        />
        <Button text="Login" onClick={handleLogin} />
        <SecondaryButton onClick={handleRegister}>Cadastre-se</SecondaryButton>
      </FormBox>
    </Container>
  );
};

export default Login;

// Styled Components

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #111;
`;

const FormBox = styled.div`
  background: #1e1e1e;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 24px;
`;

const SecondaryButton = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #888;
  background: transparent;
  color: #ccc;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #333;
    color: white;
    border-color: white;
  }
`;

