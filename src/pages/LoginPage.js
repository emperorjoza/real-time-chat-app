import React, { useState } from 'react';
import styled from 'styled-components';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('Login successful for:', email);
      onLogin(email);
    } else {
      alert('Please enter email and password!');
    }
  };

  return (
    <Container>
      <LoginCard>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit">Login</SubmitButton>
        </Form>
        <SignupText>
          Don't have an account? <SignupLink href="/signup">Sign Up</SignupLink>
        </SignupText>
      </LoginCard>
    </Container>
  );
};

export default LoginPage;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #2196f3, #6ec6ff);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #2196f3;
    outline: none;
    box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  font-size: 16px;
  color: white;
  background-color: #2196f3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1976d2;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const SignupText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #555;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const SignupLink = styled.a`
  color: #2196f3;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
