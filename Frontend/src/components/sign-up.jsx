import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function Signup() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    role: '',
    mail: '',
    password: '',
    
  });




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSignUp = async () => {
    // Check if passwords match before submitting the form


    // Check if all required fields are filled
    for (const key in formData) {
      if (formData[key] === '') {
        console.error('All fields are mandatory!');
        return;
      }
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
      
      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        const data = await response.json();
        // Handle the response from the server as needed
        console.log(data);
        // Redirect or perform additional actions based on the response
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }

    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(); // Call handleSignUp when the form is submitted
  };

  return (
    <Container maxWidth="lg" className="my-5 px-5 gradient-form">
      <Grid container>
        <Grid item md={6} className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src="/src/assets/img/logo.png" style={{ width: '185px' }} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">We are The Siblings Team</h4>
            </div>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nom"
                id="nom"
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="mb-4"
              />

              <TextField
                fullWidth
                label="Prenom"
                id="prenom"
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="mb-4"
              />

              <FormControl fullWidth className="mb-4">
                <InputLabel htmlFor="role">Role</InputLabel>
                <Select
                  label="Role"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="" disabled>Select Role</MenuItem>
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Staff">Staff</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Email address"
                id="email"
                type="email"
                name="email"
                value={formData.email}
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
                required
                className="mb-4"
              />

 

              <div className="text-center pt-1 mb-5 pb-1">
                <Button type="submit" variant="contained" className="mb-4 w-100 gradient-custom-2">
                  Sign up
                </Button>
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>{' '}
                <br />
                <a className="text-muted" href="#!">
                  Sign in
                </a>
              </div>
            </form>
          </div>
        </Grid>

        <Grid item md={6} className="mb-5 px-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signup;
