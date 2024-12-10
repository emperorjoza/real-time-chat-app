import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebase';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to login page after sign-up
    } catch (error) {
      setError(error.message); // Display error if sign-up fails
    }
  };

  return (
    <Container>
      <SignUpCard>
        <Title>Create an Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </Form>
        <LoginText>
          Already have an account? <LoginLink href="/">Login</LoginLink>
        </LoginText>
      </SignUpCard>
    </Container>
  );
}

export default SignUpPage;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #ff9800, #ffcc80);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const SignUpCard = styled.div`
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
    border-color: #ff9800;
    outline: none;
    box-shadow: 0 0 5px rgba(255, 152, 0, 0.5);
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
  background-color: #ff9800;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e68900;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const LoginText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #555;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const LoginLink = styled.a`
  color: #ff9800;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
