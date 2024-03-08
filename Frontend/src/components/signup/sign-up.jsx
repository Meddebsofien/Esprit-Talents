import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Icon from "../Icon";
import Input from "../Input";
import {
  Button,
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
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter,FaGoogle } from "react-icons/fa";

function Signup() {
  
  const navigate = useNavigate();

  // Function to handle the "Forgot password" link click
  
  const initialFormData = {
    nom: '',
    prenom: '',
    role: '',
    mail: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    numeroTel: '',
    
    adresse: '',
    specialite: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedRole, setSelectedRole] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [prenomError, setPrenomError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [adresseError, setAdresseError] = useState('');
  const [numeroTelError, setNumeroTelError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      console.log(codeResponse);
      navigate("/");
    },
    onError: (error) => console.log('signup Failed:', error)
  });
  
 
  const handleGoogleSignUp = async () => {
    try {
      const googleUser = await login(); // Appel de la fonction de connexion Google
      const userData = {
        nom: googleUser.name,
        prenom: googleUser.firstName,
        mail: googleUser.email,
        role: selectedRole // Assurez-vous que le rôle est sélectionné correctement
      };
     
      // Enregistrez l'utilisateur avec ces données dans votre backend
      const response = await axios.post('http://localhost:3700/users/register', userData);
      if (response.ok) {
        // Enregistrement réussi, redirigez l'utilisateur vers une page de confirmation ou une autre page pertinente
        navigate("/");
      } else {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur avec Google.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion avec Google :', error);
    }
  };
  const GoogleBackground =
  "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
const InstagramBackground =
  "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
const TwitterBackground =
  "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
  
  const validateCompanyName = () => {
    if (formData.companyName.length < 4) {
      setCompanyNameError('Company Name must be at least 4 characters long');
    } else {
      setCompanyNameError('');
    }
  };
  
  const validateAdresse = () => {
    // You can add validation rules for the Company Address field
    // For example, you might check if it's not empty or meets certain criteria
    // For now, let's assume it should not be empty
    if (formData.adresse.trim() === '') {
      setAdresseError('Company Address cannot be empty');
    } else {
      setAdresseError('');
    }
  };
  
  
  

  const validateName = () => {
    if (formData.nom.length < 4) {
      setNameError('LastName must be at least 4 characters long');
    } else {
      setNameError('');
    }
  };
  const validatePrenom = () => {
    if (formData.prenom.length < 4) {
      setPrenomError('Name must be at least 4 characters long');
    } else {
      setPrenomError('');
    }
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.mail)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  const validateConfirmPassword = (value) => {
    if (value !== formData.password) {
      setConfirmPasswordError("Passwords don't match");
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // Instantly validate the "Name" field
    if (name === 'nom') {
      validateName(value);
    }
   

    // Instantly validate the "Email Address" field
    if (name === 'mail') {
      validateEmail(value);
    }
    if (name === 'prenom') {
      validatePrenom(value);
    }
    if (name === 'password') {
      validatePassword(value);
    }
    if (name === 'confirmPassword') {
      validateConfirmPassword(value);
    }
    if (name === 'companyName') {
      validateCompanyName();
    }
  
    if (name === 'adresse') {
      validateAdresse();
    }
  
    if (name === 'numeroTel') {
      validateNumeroTel();
    }
  
    


  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData(initialFormData);
    setFormData((prevFormData) => ({ ...prevFormData, role }));
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
    console.log('Starting handleSignUp...');
    validatePassword();
    validateName();
    validateEmail();
    validateConfirmPassword();
  
    if (passwordError || formData.password !== formData.confirmPassword) {
      console.log('Validation failed, not proceeding with signup.');
      return;
    }
  
    try {
      const formDataCopy = { ...formData };
      console.log('formDataCopy:', formDataCopy);
  
      const response = await fetch('http://localhost:3700/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataCopy),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful. Data:', data);
        navigate('/signin');
      } else {
        const errorData = await response.json();
        console.error('Error during signup. Error:', errorData);
        if (errorData.error === 'User already registered!') {
          setEmailExistsError('Email already exists');
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  
    console.log('handleSignUp completed.');
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };
 
  return (
    <div className="signin-background">
    <MainContainer >
      <Grid container justifyContent="center">
        <Grid item md={6} className="mb-5">
         
            <CardContent>
              <div className="d-flex flex-column align-items-center">
                
             
                <div className="d-flex justify-content-between mb-5" >
                  <Button
                    variant={selectedRole === 'Company' ? 'contained' : 'outlined'}
                    onClick={() => handleRoleChange('Company')}
                    style={{
                      backgroundColor: selectedRole === 'Company' ? 'white' : '#14163c',
                      color: selectedRole === 'Company' ? '#14163c' : 'white',
                      border: 'none',
                      marginRight: '10px',
                      
                      
                    }}
                  >
                    Company
                  </Button>
                  <Button
                    variant={selectedRole === 'Staff' ? 'contained' : 'outlined'}
                    onClick={() => handleRoleChange('Staff')}
                    style={{
                      backgroundColor: selectedRole === 'Staff' ? 'white' : '#14163c',
                      color: selectedRole === 'Staff' ? '#14163c' : 'white',
                      border: 'none',
                      marginRight: '10px',
                    }}
                  >
                    Staff
                  </Button>
                  <Button
                    variant={selectedRole === 'Student' ? 'contained' : 'outlined'}
                    onClick={() => handleRoleChange('Student')}
                    style={{
                      backgroundColor: selectedRole === 'Student' ? 'white' : '#14163c',
                      color: selectedRole === 'Student' ? '#14163c' : 'white',
                      border: 'none',
                    }}
                  >
                    Student
                  </Button>
                </div>
               
                <form onSubmit={handleSubmit}>
                  {selectedRole === 'Company' && (
                    <>
                      <TextField
                        fullWidth
                        label="Company Name"
                        id="companyName"
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="mb-4"
                        onBlur={validateCompanyName}
                        error={Boolean(companyNameError)}
                        helperText={companyNameError}
                      />
                      <TextField
                        fullWidth
                        label="Company Address"
                        id="adresse"
                        type="text"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        className="mb-4"
                        onBlur={validateAdresse}
                        error={Boolean(adresseError)}
                        helperText={adresseError}
                        
                      />
                     

                      
                    </>
                  )}

                  {selectedRole === 'Staff' && (
                    <>
                      {/* Add Staff specific fields here */}
                    </>
                  )}

                  {selectedRole === 'Student' && (
                    <>
                      <FormControl fullWidth className="mb-4">
                        <InputLabel htmlFor="specialite">Specialization</InputLabel>
                        <Select
                          label="Specialization"
                          id="specialite"
                          name="specialite"
                          value={formData.specialite}
                          onChange={handleChange}
                          required
                        >
                          <MenuItem value="" disabled>
                            Select Specialization
                          </MenuItem>
                          <MenuItem value="Information technology(IT)">Information technology(IT)</MenuItem>
                          <MenuItem value="Business">Business</MenuItem>
                          <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
                          <MenuItem value="Mechanical">Mechanical</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}

                  <TextField
                    fullWidth
                    label="Last Name"
                    id="nom"
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="mb-4"
                    onBlur={validateName}
                    error={Boolean(nameError)}
                    helperText={nameError}
                  />

                  <TextField
                    fullWidth
                    label="Name"
                    id="prenom"
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="mb-4"
                    onBlur={validatePrenom}
                    error={Boolean(prenomError)}
                    helperText={prenomError}
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    id="mail"
                    type="email"
                    name="mail"
                    onBlur={validateEmail}
                    error={Boolean(emailError)}
                    helperText={emailError}
                    value={formData.mail}
                    onChange={handleChange}
                    required
                    className="mb-4"
                    
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={validatePassword}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    required
                    className="mb-4"
                  />

                 <TextField
            fullWidth
            label="Confirm Password"
            id="confirmPassword"
             type="password"
             name="confirmPassword"
            value={formData.confirmPassword}
           onChange={handleChange}
            required
               onBlur={validatePassword}
         
            className="mb-4"
            />
            {/* Add a div to display the password mismatch message */}
             {passwordMismatchError && (
            <div style={{ color: 'red' }}>{passwordMismatchError}</div>
                       )}

                  <div className="text-center pt-1  pb-1">
                  <div >
                  <Button
  variant="contained"
  type="submit"
  className="custom-button"
  onClick={handleSignUp}
>
  Sign up
</Button>
                    

                    <br />
                    <div style={{paddingTop:'10px'}}>
                    <a className="text-muted" href="#!" style={{ color: 'red' }}>
                      Sign in
                    </a>
                    </div>
                    </div>
                  </div>
                </form>
              </div>
            </CardContent>
         
        </Grid>
        {/* <div className="vertical-line" /> */}
        
      </Grid>
      <LoginWith >OR Signup WITH</LoginWith>
  <IconsContainer>
    
  <button
  className="styled-button"
  color={InstagramBackground}
  onClick={handleGoogleSignUp}
>
  <FaGoogle />
</button>
    
      
        <Icon color={InstagramBackground}>
          <FaInstagram />
        </Icon>
        <Icon color={TwitterBackground}>
          <FaTwitter />
        </Icon>
      </IconsContainer>
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
@media only screen and (max-width: 350px) {
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
  width: 90vw;
  height: 90vh;
}
@media only screen and (min-width: 1024px) {
  width: 90vw;
  height: 90vh;
}
@media only screen and (min-width: 1280px) {
  width: 40vw;
  height: 130vh;
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
color: #1e90ff;
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

width: 80%;

`;

const ForgotPassword = styled.h4`
cursor: pointer;
`;


export default Signup;
