import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";
import Button from "../Button";
import Icon from "../Icon";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Swal from "sweetalert2";
import {
  
    Container,
    Grid,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Card,
    CardContent,
    InputAdornment
  } from '@mui/material';

export default function Signupggle() {
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
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  const [passwordError, setPasswordError] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  
  const [formData, setFormData] = useState({
    role: '',
    password: '',
    confirmPassword: '',
  });

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => { setUser(codeResponse), console.log(codeResponse) },
    onError: (error) => console.log('Login Failed:', error)
  });

 //loginwith google 
 useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          const { name, email } = res.data; 
          console.log('User name:', name);
          console.log('User email:', email);
          setProfile({ name, email }); 
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  
  

const validateConfirmPassword = (value) => {
    if (value !== formData.password) {
      setConfirmPasswordError("Passwords don't match");
    } else {
      setConfirmPasswordError('');
    }
  };
  const validatePassword = () => {
    // Check password strength
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!strongPasswordRegex.test(formData.password)) {
      setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
    } else {
      setPasswordError('');
    }
  
    // Check if passwords match
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setPasswordMismatchError("Passwords don't match");
    } else {
      setPasswordMismatchError('');
    }
  };
  const handleSignUp = async () => {
    validatePassword();
   
    validateConfirmPassword();
  
    if (passwordError || formData.password !== formData.confirmPassword) {
      return;
    }
    const dataToSend = {
        ...formData,
        nom: profile.name, // Récupérez le nom du compte Google
        mail: profile.email, // Récupérez l'e-mail du compte Google
      };
    
      console.log('Data to be sent to the backend:', dataToSend);
    
    console.log('Data to be sent to the backend:', formData);
    try {
      const response = await fetch('http://localhost:3700/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(dataToSend),
      });
     
      console.log('Response:', response);
  
      if (response.ok) {
        Swal.fire("An email sent to your Account please verify");

        navigate("/signin");
        const data = await response.json();
        console.log('Data:', data);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        if (errorData.error === 'User already registered!') {
          setEmailExistsError('Email already exists');
        }
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  if (user) {
    return (
      <section id="hero">
      <div className="hero-container">
     
        <MainContainer>
          <WelcomeText>Welcome</WelcomeText>
          <form onSubmit={handleSubmit}>
            {/* Additional form fields for role and password */}
            <div className="form-group">
              
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className="form-control transparent-list" // Ajout de la classe transparent-list
              >
                <option value="" disabled>Select Role</option>
                <option value="Student">Student</option>
                <option value="Company">Company</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div className="text-center mt-6 mb-3">
              <TextField
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="text-center mt-6 mb-3">
              <TextField
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
            <div className="text-center pt-1 mb-5 pb-1">
              <div className="button-wrapper">
              <div className="text-center pt-1 pb-1">
            <button type="submit"   className="custom-button">Sign Up</button>
            </div>
            </div>
            </div>
          </form>
        </MainContainer>
     
      </div>
      </section>
    );
  }
  

  return (
    <div className="signin-background">
      <MainContainer>
        <WelcomeText>Welcome</WelcomeText>
        <button onClick={login}>Login with Google</button>
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