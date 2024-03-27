import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const ForgotPassword = () => {
  const [mail, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3700/forgot-password",
        { mail }
      );
      console.log("Response:", response);
      setSuccessMessage("Password reset link sent successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error sending password reset link. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <ForgotPasswordContainer>
      <section id="hero">
        <div className="hero-container">
          <ForgotPasswordBox>
            <h4>Forgot Password</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  className="form-control"
                  value={mail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-100"
                style={{ backgroundColor: "rgba(31, 38, 135)", border: "none" }}
              >
                Send
              </button>
            </form>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </ForgotPasswordBox>
        </div>
      </section>
    </ForgotPasswordContainer>
  );
};

const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #14163c;
`;

const ForgotPasswordBox = styled.div`
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

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
  }

  button {
    width: 100%;
  }

  .success-message,
  .error-message {
    margin-top: 20px;
  }

  @media only screen and (max-width: 768px) {
    width: 80vw;
  }
`;

export default ForgotPassword;
