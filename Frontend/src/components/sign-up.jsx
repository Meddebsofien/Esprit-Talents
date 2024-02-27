import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function Signup() {
  const initialFormData = {
    nom: '',
    prenom: '',
    role: '',
    mail: '',
    password: '',
    companyName: '',
    numeroTel: '',
    fax: '',
    adresse: '',
    specialite: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Fonction de gestion du changement de rôle
  const handleRoleChange = (role) => {
    setFormData(initialFormData); // Réinitialiser le formulaire lorsque le rôle change
    setFormData((prevFormData) => ({ ...prevFormData, role }));
  };

  // Fonction de gestion de l'inscription
  const handleSignUp = async () => {
    // Champs obligatoires pour chaque rôle
    const requiredFields = ['nom', 'prenom', 'role', 'mail', 'password'];
  
    // Champs spécifiques à chaque rôle
    const roleSpecificFields = {
      Student: ['specialite'],
      Company: ['companyName', 'adresse', 'numeroTel'],
      Staff: ['mail'],
    };
  
    // Fusionner les champs spécifiques au rôle avec les champs généraux
    const allRequiredFields = [...requiredFields, ...(roleSpecificFields[formData.role] || [])];
  
    // Vérifier si les champs obligatoires sont remplis
    for (const key of allRequiredFields) {
      if (formData[key] === '') {
        console.error('Tous les champs obligatoires ne sont pas remplis !');
        return;
      }
    }

    try {
      // Effectuer la requête POST vers l'API
      const response = await fetch('http://localhost:3700/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Réponse :', response);

      // Vérifier si la réponse est réussie (code d'état 2xx)
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Rediriger ou effectuer des actions supplémentaires en fonction de la réponse
      } else {
        const errorData = await response.json();
        console.error('Erreur :', errorData);
      }
    } catch (error) {
      console.error('Erreur Fetch :', error);
    }
  };

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
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
                  onChange={(e) => handleRoleChange(e.target.value)}
                  required
                >
                  <MenuItem value="" disabled>Select Role</MenuItem>
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Staff">Staff</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                </Select>
              </FormControl>

              {formData.role === 'Company' && (
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
                  />
                  {/* ... rest of the company-specific fields ... */}
                </>
              )}

              {formData.role === 'Student' && (
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
                      <MenuItem value="" disabled>Select Specialization</MenuItem>
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
                label="Email address"
                id="mail"
                type="email"
                name="mail"
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
                required
                className="mb-4"
              />

              {formData.role === 'Company' && (
                <>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    id="numeroTel"
                    type="tel"
                    name="numeroTel"
                    value={formData.numeroTel}
                    onChange={handleChange}
                    required
                    className="mb-4"
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
                  <TextField
                    fullWidth
                    label="Address"
                    id="adresse"
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    className="mb-4"
                  />
                </>
              )}

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
