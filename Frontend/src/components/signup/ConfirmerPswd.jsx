import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
const ConfirmPassword = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation(); // Hook pour accéder à l'objet location
  const navigate = useNavigate();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { nom, prenom, mail, role } = location.state.data; // Récupération des données extraites
      const userData = {
        prenom: prenom,
        nom: nom,
        mail: mail,
        role: role,
        password: password
      };
  
      console.log('Données envoyées au backend :', userData);
  
      const response = await axios.post(
        "http://localhost:3700/users/registercv",
        userData
      );
  
      if (response.status === 201) {
        console.log('Compte créé avec succès!');
        navigate("/signin");
        // window.location.href = 'url_de_votre_page';
      } else {
        console.error(
          "Erreur lors de la création du compte:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création du compte:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <section id="hero">
      <div className="hero-container">
        <MainContainer>
          <h2>Enter password</h2>
          <form className="signin-form">
            <div className="text-center mt-6 mb-3">
              <TextField
                fullWidth
                label="Password"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="mb-3"
              />
            </div>
            <div className="text-center pt-1 mb-5 pb-1">
              <div className="button-wrapper">
              <div className="text-center pt-1 pb-1">
 
    <button
      variant="contained"
      type="submit"
      className="custom-button"
      onClick={handleSubmit}
      disabled={isLoading} // Add disabled prop if needed
      style={{ marginTop: "7%" }}
    >
      {isLoading ? 'Chargement...' : 'SignUp'}
    </button>
   
    
 
</div>

              </div>
            </div>
          </form>
          <Link to="/">BACK TO HOME PAGE</Link>
        </MainContainer>
      </div>
    </section>
  );
};
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 90vh;
  }
`;


const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
  color: #555;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
  color: #555;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
`;
export default ConfirmPassword;
