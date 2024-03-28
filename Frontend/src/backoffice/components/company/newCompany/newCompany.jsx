import React, { useState } from 'react';
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Input } from '@mui/base';
import './newCompany.scss';
import { useNavigate } from 'react-router-dom';


const Company = ({ title }) => {
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    adresse: "",
    numeroTel: "+216 ", 
    nom: "",
    prenom: "",
    password: "",
    mail: "",
    role: "Company"
  });

  const [errorNom, setErrorNom] = useState("");
  const [errorPrenom, setErrorPrenom] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCompanyName, setErrorCompanyName] = useState("");
  const [errorAdresse, setErrorAdresse] = useState("");
  const [errorNumeroTel, setErrorNumeroTel] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateCompanyName = () => {
    if (formData.companyName.length < 3 || !/^[A-Za-z]+$/.test(formData.companyName)) {
      setErrorCompanyName("Le nom de l'entreprise doit contenir au moins 3 chiffres.");
      return false;
    }
    setErrorCompanyName("");
    return true;
  };

  const validateAdresse = () => {
    if (formData.adresse.length < 5 || !/^[A-Za-z]+$/.test(formData.adresse)) {
      setErrorAdresse("L'adresse de l'entreprise doit contenir au moins 5 chiffres.");
      return false;
    }
    setErrorAdresse("");
    return true;
  };

  const validateNumeroTel = () => {
    const numeroTelRegex = /^\+216\s?\d{2}\s?\d{3}\s?\d{3}$/;
    if (!numeroTelRegex.test(formData.numeroTel)) {
      setErrorNumeroTel("Le numéro de téléphone doit commencer par +216 suivi de 8 chiffres, pouvant inclure des espaces.");
      return false;
    }
    setErrorNumeroTel("");
    return true;
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
      const updatedFormData = { ...formData, role: "Company" };
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
        navigate('/admin/users/CompanyList');
      } else {
        // Handle other response statuses or errors
        console.error('Failed to create user');
      }

    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topnewCompany">
          <h1>Add New Company</h1>
        </div>
        <div className="bottomnewCompany">
          <div className="left">
            <div className="column">
              {
              /* <img
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
              </div> */
              }
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

                <div className="formInput">
                  <label>Company Name</label>
                  <Input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    onBlur={validateCompanyName}

                  />
                   {errorCompanyName && <span className="error smallError">{errorCompanyName}</span>}
                </div>

                <div className="formInput">
                  <label>Company Address</label>
                  <Input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    onBlur={validateAdresse}

                  />
                   {errorAdresse && <span className="error smallError">{errorAdresse}</span>}

                </div>

                <div className="formInput">
                  <label>Company Telephone</label>
                  <Input
                    type="text"
                    name="numeroTel"
                    value={formData.numeroTel}
                    onChange={handleChange}
                    onBlur={validateNumeroTel}
                  />
                   {errorNumeroTel && <span className="error smallError">{errorNumeroTel}</span>}

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

export default Company;
