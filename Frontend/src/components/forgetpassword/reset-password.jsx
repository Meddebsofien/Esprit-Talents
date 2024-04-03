import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3700/reset-password/${id}/${token}`,
        { password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.Status === 'Success') {
        setSuccessMessage('Password reset successful!');
        setErrorMessage('');
        navigate('/Signin');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error resetting password. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <ResetPasswordContainer>
       <div className="signin-background">
      <ResetPasswordBox>
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <InputLabel htmlFor="password">
            <strong>New Password</strong>
          </InputLabel>
          <Input
            type="password"
            placeholder="Enter Password"
            autoComplete="off"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{color:'black'}}
          />
          <SubmitButton type="submit" className="btn btn-success" style={{backgroundColor:'rgba(31, 38, 135)' ,border:'none'}}>
            Update
          </SubmitButton>
        </form>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </ResetPasswordBox>
      </div>
    </ResetPasswordContainer>
  );
};

const ResetPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #14163c;
`;

const ResetPasswordBox = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  padding: 20px;
  width: 30vw;

  h4 {
    margin-bottom: 20px;
  }

  form {
    width: 100%;
  }
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 100%;
`;

const SuccessMessage = styled.div`
  margin-top: 20px;
  color: #28a745;
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  color: #dc3545;
`;

export default ResetPassword;
