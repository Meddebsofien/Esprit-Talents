import React, { useState } from "react"; 
import styled from "styled-components";
import Button from "../Button";
import Icon from "../Icon";
import Input from "../Input";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";



import axios from "axios";


function SignInComponent() {
   
  
  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
    
    const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
    
  const handleSubmit = async (e, mail, password) => {
    e.preventDefault();
    const data = {
        mail: mail,
        password: password
      };
  
    try {
      const url = "http://localhost:3700/users/signin";
      const response = await axios.post(url, {
        mail: mail,
        password: password,
      
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Vérifiez la configuration CORS côté serveur
        } ,
        method: 'POST',
       
       
      });
      localStorage.setItem("token", response.data.token);
      history.push("/admin"); 
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        console.log(error.response.data.message); 
      } else {
        console.log("Une erreur s'est produite lors de la connexion."); 
      }
    }
  };
 
      return (
        <div className="signin-background">
        <Container>
          <WelcomeText>Welcome</WelcomeText>
          <form onSubmit={(e) => handleSubmit(e, mail, password)}>
          <InputContainer>
            <Input
              type="email"
              id="mail"
              name="mail"
              value={mail}
              onChange={handleEmailChange}
              required
            />
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </InputContainer>
          <ButtonContainer>
          <Button type="submit" content="Sign In" />
          </ButtonContainer>
          </form>
          <LoginWith>OR LOGIN WITH</LoginWith>
          <HorizontalRule />
          <IconsContainer>
            <Icon color={FacebookBackground}>
              <FaFacebookF />
            </Icon>
            <Icon color={InstagramBackground}>
              <FaInstagram />
            </Icon>
            <Icon color={TwitterBackground}>
              <FaTwitter />
            </Icon>
          </IconsContainer>
          <ForgotPassword>Forgot Password ?</ForgotPassword>
         
        </Container>
        </div>
      );
}

const Container = styled.div`
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
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
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

export default SignInComponent;