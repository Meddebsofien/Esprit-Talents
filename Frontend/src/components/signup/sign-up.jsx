import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    fax: '',
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
  
  const validateNumeroTel = () => {
    // Validate that the Phone Number starts with '+216' and is followed by 8 digits
    const phoneRegex = /^\d{8}$/;
  
    if (!phoneRegex.test(formData.numeroTel)) {
      setNumeroTelError('Invalid Phone Number. Please enter a valid number starting with +216 and followed by 8 digits.');
    } else {
      setNumeroTelError('');
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
    validatePassword();
    validateName();
    validateEmail();
    validateConfirmPassword();
  
    if (passwordError || formData.password !== formData.confirmPassword) {
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3700/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        const data = await response.json();
        
        console.log('Data:', data);
        navigate('/signin');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        if (errorData.error === 'User already registered!') {
          setEmailExistsError('Email already exists');
        }
      }
    } catch (error) {
      
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <Container maxWidth="lg" className="my-5 px-5">
      <Grid container justifyContent="center">
        <Grid item md={6} className="mb-5">
          <Card>
            <CardContent>
              <div className="d-flex flex-column align-items-center">
                <img src="/src/assets/img/logo.png" style={{ width: '185px' }} alt="logo" />
                <h4 className="mt-1 mb-4" style={{ color: 'black' }}>
                  We are The Siblings Team
                </h4>

                <div className="d-flex justify-content-between mb-4">
                  <Button
                    variant={selectedRole === 'Company' ? 'contained' : 'outlined'}
                    onClick={() => handleRoleChange('Company')}
                    style={{
                      backgroundColor: selectedRole === 'Company' ? 'white' : 'red',
                      color: selectedRole === 'Company' ? 'red' : 'white',
                      border: 'none',
                    }}
                  >
                    Company
                  </Button>
                  <Button
                    variant={selectedRole === 'Staff' ? 'contained' : 'outlined'}
                    onClick={() => handleRoleChange('Staff')}
                    style={{
                      backgroundColor: selectedRole === 'Staff' ? 'white' : 'red',
                      color: selectedRole === 'Staff' ? 'red' : 'white',
                      border: 'none',
                    }}
                  >
                    Staff
                  </Button>
                  <Button
                    variant={selectedRole === 'Student' ? 'contained' : 'outlined'}
                    onClick={() => handleRoleChange('Student')}
                    style={{
                      backgroundColor: selectedRole === 'Student' ? 'white' : 'red',
                      color: selectedRole === 'Student' ? 'red' : 'white',
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
                     <TextField
                        fullWidth
                        label="Phone Number"
                        id="numeroTel"
                        type="tel"
                        name="numeroTel"
                        value={formData.numeroTel}
                        onChange={handleChange}
                        onBlur={validateNumeroTel}
                        error={Boolean(numeroTelError)}
                        helperText={numeroTelError}
                        required
                        className="mb-4"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">+216</InputAdornment>,
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Fax"
                        id="fax"
                        type="text"
                        name="fax"
                        value={formData.fax}
                        onChange={handleChange}
                        className="mb-4"
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

                  <div className="text-center pt-1 mb-5 pb-1">
                    <Button
                      type="submit"
                      variant="contained"
                      className="mb-4 w-100"
                      style={{ backgroundColor: 'red', color: 'white' }}
                    >
                      Sign up
                    </Button>
                    <Link to="/forgetpass">Forgot password?</Link>

                    <br />
                    <a className="text-muted" href="#!" style={{ color: 'red' }}>
                      Sign in
                    </a>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <div className="vertical-line" />
        <Grid item md={6} className="mb-5 px-5">
          <div className="d-flex flex-column justify-content-center h-100 mb-4" style={{ backgroundColor: 'red', color: 'white' }}>
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signup;
