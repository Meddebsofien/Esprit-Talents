import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { Input, Select, MenuItem } from '@mui/base';


const NewStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    password: "",
    mail: "",
    role: "Student",
    specialite: ""
  });

  const [errors, setErrors] = useState({
    nom: "",
    prenom: "",
    mail: "",
    password: ""
  });

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      // Mettre à jour les données du formulaire
      setFormData({
        ...formData,
        [name]: value,
      });
      // Valider le champ modifié
      const error = validateField(name, value);
      // Mettre à jour les erreurs pour le champ modifié
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };
  
  

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "nom":
      case "prenom":
        if (value.length < 3 || !/^[A-Za-z]+$/.test(value)) {
          return `Le ${fieldName} doit commencer par une lettre et contenir au moins 3 caractères.`;
        }
        break;
      case "mail":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Veuillez saisir une adresse e-mail valide.";
        }
        break;
      case "password":
        if (value.length < 8 || !/[a-zA-Z]/.test(value) || !/\d/.test(value) || !/[^a-zA-Z\d]/.test(value)) {
          return "Le mot de passe doit contenir au moins 8 caractères, y compris des lettres, des chiffres et des symboles.";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    for (const key in formData) {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        console.log("Sending data:", formData);

        const response = await fetch('http://localhost:3700/users/AddUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 201) {
          // User created successfully, navigate to the StudentList page
          navigate('/admin/users/StudentList');
        } else {
          // Handle other response statuses or errors
          console.error('Failed to create Student');
        }

      } catch (error) {
        console.error('Error creating Student:', error.message);
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Student</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit} className="form centeredButton">
              <div className="column">
                <div className="formInput">
                  <label>First Name</label>
                  <Input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                  {errors.nom && <span className="error smallError">{errors.nom}</span>}
                </div>

                <div className="formInput">
                  <label>Last Name</label>
                  <Input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                  />
                  {errors.prenom && <span className="error smallError">{errors.prenom}</span>}
                </div>

                <div className="formInput">
                  <label>Password</label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <span className="error smallError">{errors.password}</span>}
                </div>
                <div className="formInput">
                  <label>Speciliality</label>
                  <Input
                    type="text"
                    name="specialite"
                    value={formData.specialite}
                    onChange={handleChange}
                  />
                  {errors.password && <span className="error smallError">{errors.password}</span>}
                </div>
              </div> 
              

              <div className="column">
                <div className="formInput">
                  <label>Email</label>
                  <Input
                    type="email"
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
                  />
                  {errors.mail && <span className="error smallError">{errors.mail}</span>}
                </div>

               
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStudent;
