import React, { useState } from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import './staff.scss';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { Input } from '@mui/base';


const Staff = ({ title }) => {
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    password: "",
    mail: "",
    role: "Staff"
  });

  const [errorNom, setErrorNom] = useState("");
  const [errorPrenom, setErrorPrenom] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
 

  
  const validateNom = () => {

    if (formData.nom.length < 3 || !/^[A-Za-z]+$/.test(formData.nom)) {
      setErrorNom("Le nom doit commencer par une lettre et contenir au moins 3 caractères.");
      return false;
    }
    setErrorNom("");
    return true;
  };

  const validatePrenom = () => {

    if (formData.prenom.length < 3 || !/^[A-Za-z]+$/.test(formData.prenom)) {
      setErrorPrenom("Le prénom doit commencer par une lettre et contenir au moins 3 caractères.");
      return false;
    }
    setErrorPrenom("");
    return true;
  };

  const validateMail = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      setErrorMail("Veuillez saisir une adresse e-mail valide.");
      return false;
    }
    setErrorMail("");
    return true;
  };

  const validatePassword = () => {
    if (formData.password.length < 8 || !/[a-zA-Z]/.test(formData.password) || !/\d/.test(formData.password) || !/[^a-zA-Z\d]/.test(formData.password)) {
      setErrorPassword("Le mot de passe doit contenir au moins 8 caractères, y compris des lettres, des chiffres et des symboles.");
      return false;
    }
    setErrorPassword("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateNom() || !validatePrenom() || !validateMail() || !validatePassword()) {
      return;
    }

    try {
      const updatedFormData = { ...formData, role: "Staff" };
      console.log("Sending data:", updatedFormData);

      const response = await fetch('http://localhost:3700/users/AddUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });


      if (response.status === 201) {
        // User created successfully, navigate to the CompanyList page
        navigate('/admin/users/StaffList');
      } else {
        // Handle other response statuses or errors
        console.error('Failed to create Staff');
      }

    } catch (error) {
      console.error('Error creating Staff:', error.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Staff</h1>
        </div>
        <div className="bottom1Staff">
          <div className="left">
            <div className="column">
              {/* <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              /> */}
              {/* <div className="formInput">
                <label htmlFor="file" style={{ marginTop: '15px' }}>
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label> */}
                {/* <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}
            </div>
          </div>
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
                    onBlur={validateNom}
                  />
                  {errorNom && <span className="error smallError">{errorNom}</span>}
                </div>

                <div className="formInput">
                  <label>Last Name</label>
                  <Input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    onBlur={validatePrenom}
                  />
                  {errorPrenom && <span className="error smallError">{errorPrenom}</span>}
                </div>

                <div className="formInput">
                  <label>Password</label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={validatePassword}
                  />
                  {errorPassword && <span className="error smallError">{errorPassword}</span>}
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
                    onBlur={validateMail}
                  />
                  {errorMail && <span className="error smallError">{errorMail}</span>}
                </div>

              

               

               

                <button type="submit" style={{}}>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
