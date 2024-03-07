import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";
import Button from "../Button";
import Icon from "../Icon";

import {
 
  TextField,
  
} from '@mui/material';
import Input from "../Input";
import { useNavigate  } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter,FaGoogle  } from "react-icons/fa";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
export default function Login() {
    const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mail, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#BD2C43");
  const [emailSent, setEmailSent] = useState(false);
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => {setUser(codeResponse), console.log(codeResponse)},
      onError: (error) => console.log('Login Failed:', error)
  });
  const handleGoogleLogin = () => {
    login(); // Appel de la fonction de connexion Google
  };
  const GoogleBackground =
  "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
const InstagramBackground =
  "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
const TwitterBackground =
  "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
  
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.target.value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  // Fonction pour l'authentification
  const signIn = async () => {
    if (!mail || !password) {
      setErrorMessage('Please fill in all fields correctly');
      return;
    }
    const userData = {
      mail,
      password,
    };
    try {
      const response = await axios.post('http://localhost:3700/users/signin', userData);
      setIsLoading(true)
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
      if (error.response.status === 401) {
        setErrorMessage("Incorrect Password");
      } else if (error.response.status === 404) {
        setErrorMessage("User Not Found");
      } 
      if(error.response.status === 403) {
        setErrorMessage("Please verify");
      }
    
    }
  };

  // Fonction de gestion du changement de mot de passe
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Fonction de gestion du changement de rôle
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
const handleForgotPassword = async () => {
  if(!mail){
    setErrorMessage('Please type your email address');
    return
  }
  
  try {
    const response = await axios.post('http://localhost:5000/auth/forgot-password', { mail: mail });
    console.log(response.data);
    setEmailSent(true);
  } catch (error) {
    console.error(error);
    setErrorMessage(error.response.data.message);
  }
};

  // Vérifie si le formulaire est valide
  const isFormValid = () => {
    return mail && !emailError && password;
  };
  const googleAuth = () => {
    window.open(
        `${process.env.REACT_APP_API_URL}/auth/google/callback`,
        "_self"
    );
};

//loginwith google 
useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);
 // log out function to log the user out of google and set the profile array to null
 const logOut = () => {
    googleLogout();
    setProfile(null);
};
  return (
<div className="signin-background">
    <MainContainer>
    <WelcomeText>Welcome</WelcomeText>
      
    <>
    {isLoading ? (
     <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
     <HashLoader
       color={color}
       loading={isLoading}
       size={150}
       aria-label="Loading Spinner"
       data-testid="loader"
     />
   </div>
    ) : (
      <>
      
      <form className="signin-form">
      <div className=" mb-3">
  {/* Champ Email */}
 
  <TextField
                    fullWidth
                    label="Email Address"
                    id="email"
                    type="email"
                    name="mail"
                   
                    error={Boolean(emailError)}
                    helperText={emailError}
                    
                    value={mail}
                    onChange={handleEmailChange}
                    required
                    className="mb-4"
                   
                  />

  {/* Champ Mot de passe */}
 
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
  {/* Bouton Se connecter */}
  <div className="text-center pt-1 mb-5 pb-1">
  <div className="button-wrapper">
    <button type="button" onClick={() => signIn()} className="custom-button">Login</button>
  </div>
  </div>
  </div>
  {/* Affichage du message d'erreur */}
  {errorMessage && !emailSent && (
    <div className="error-message">{errorMessage}</div>
  )}

  {emailSent && (
    <div className="success-message">A recovery email has been sent</div>
  )}
</form>

              
            
    </>
    )}
  </>
  <LoginWith>OR LOGIN WITH</LoginWith>
  <IconsContainer>
    
    <Icon  color={InstagramBackground}   style={{ cursor: 'pointer' }} onClick={() => handleGoogleLogin()}>
          <FaGoogle />
        </Icon>
    
      
        <Icon color={InstagramBackground}>
          <FaInstagram />
        </Icon>
        <Icon color={TwitterBackground}>
          <FaTwitter />
        </Icon>
      </IconsContainer>
      
      <Link to="/forgetpass">Forgot password?</Link>
  </MainContainer>
  </div>

  );
}
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
