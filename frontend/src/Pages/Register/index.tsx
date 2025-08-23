import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background: #1e1e1e;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
`;

const Select = styled.select`
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 24px;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
`;

const Button = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #45a049;
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: #ccc;
  border: 2px solid #ccc;
  margin-top: 8px;

  &:hover {
    background: #333;
    color: white;
    border-color: white;
  }
`;

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: "student" | "coordinator" | "speaker";
  }>({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cadastro realizado com sucesso!");
    navigate("/"); // Redireciona para a tela de login
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <RegisterContainer>
      <Title>Register</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <Select
          value={formData.role}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFormData({
              ...formData,
              role: e.target.value as "student" | "coordinator" | "speaker",
            })
          }
        >
          <option value="student">Student</option>
          <option value="coordinator">Coordinator</option>
          <option value="speaker">Speaker</option>
        </Select>
        <Button type="submit">Register</Button>
        <SecondaryButton type="button" onClick={handleBackToLogin}>
          Voltar para o Login
        </SecondaryButton>
      </form>
    </RegisterContainer>
  );
};

export default Register;
