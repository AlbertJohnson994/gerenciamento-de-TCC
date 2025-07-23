// import React, { useState } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

// const RegisterContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   max-width: 400px;
//   margin: 2rem auto;
//   padding: 2rem;
//   border-radius: 8px;
//   background: #1e1e1e;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
// `;

// const Select = styled.select`
//   padding: 0.8rem;
//   margin: 0.5rem 0;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 1rem;
// `;

// const Title = styled.h2`
//   color: white;
//   text-align: center;
//   margin-bottom: 24px;
// `;

// const Input = styled.input`
//   padding: 0.8rem;
//   margin: 0.5rem 0;
//   border-radius: 4px;
//   border: none;
//   font-size: 1rem;
// `;

// const Button = styled.button`
//   margin-top: 16px;
//   width: 100%;
//   padding: 12px;
//   border-radius: 8px;
//   border: none;
//   background: #4caf50;
//   color: white;
//   font-size: 16px;
//   cursor: pointer;
//   transition: 0.3s;

//   &:hover {
//     background: #45a049;
//   }
// `;

// const SecondaryButton = styled(Button)`
//   background: transparent;
//   color: #ccc;
//   border: 2px solid #ccc;
//   margin-top: 8px;

//   &:hover {
//     background: #333;
//     color: white;
//     border-color: white;
//   }
// `;

// const Register: React.FC = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState<{
//     name: string;
//     email: string;
//     password: string;
//     role: "student" | "coordinator" | "speaker";
//   }>({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Cadastro realizado com sucesso!");
//     navigate("/"); // Redireciona para a tela de login
//   };

//   const handleBackToLogin = () => {
//     navigate("/");
//   };

//   return (
//     <RegisterContainer>
//       <Title>Register</Title>
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           required
//         />
//         <Input
//           type="email"
//           placeholder="Email"
//           autoComplete="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           required
//         />
//         <Input
//           type="password"
//           placeholder="Password"
//           autoComplete="current-password"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//           required
//         />
//         <Select
//           value={formData.role}
//           onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
//             setFormData({
//               ...formData,
//               role: e.target.value as "student" | "coordinator" | "speaker",
//             })
//           }
//         >
//           <option value="student">Student</option>
//           <option value="coordinator">Coordinator</option>
//           <option value="speaker">Speaker</option>
//         </Select>
//         <Button type="submit">Register</Button>
//         <SecondaryButton type="button" onClick={handleBackToLogin}>
//           Voltar para o Login
//         </SecondaryButton>
//       </form>
//     </RegisterContainer>
//   );
// };

// export default Register;

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../components/InputText"; // Import your InputText component

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (username && email && password) {
      alert("Registration successful!");
      navigate("/"); // Redirect to home/login
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <PageContainer>
      <Header>
        <NavLink onClick={handleHome}>Home</NavLink>
        <NavLink href="/login">Register</NavLink>
      </Header>

      <RegisterContainer>
        <Title>Register New Account</Title>

        <FormContainer>
          <InputText
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            img="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          />

          <InputText
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            img="https://cdn-icons-png.flaticon.com/512/561/561127.png"
            type="email"
          />

          <InputText
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            img="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
          />

          <InputText
            label="Confirm your password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            img="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
          />

          <RegisterButton onClick={handleRegister}>Register Now</RegisterButton>
        </FormContainer>
      </RegisterContainer>
    </PageContainer>
  );
};

export default RegisterPage;

// Styled Components
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
  cursor: pointer;

  &:hover {
    color: #0066cc;
    text-decoration: underline;
  }
`;

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RegisterButton = styled.button`
  padding: 12px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 20px;

  &:hover {
    background-color: #0052a3;
  }
`;
