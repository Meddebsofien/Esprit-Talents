import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Navbar from "../../frontoffice/pages/Navbar";
import Footer from "../../frontoffice/pages/footer";



import { TextField, Button, Grid, Paper, Typography ,Snackbar} from "@mui/material";

const UpdateProfile = () => {
  const { userId } = useParams();
  const [successOpen, setSuccessOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    nom: "",
    prenom: "",
    mail: "",
    specialite: "",
    password: "",
    companyName: "",
    domaine: "",
    numeroTel: "",
    photo: null,
    role: "", // Ajoutez le champ "role" dans le state initial
  });
  const [photo, setPhoto] = useState(null);
 
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3700/users/getutilisateur/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setProfileData({
            nom: response.data.nom || "",
            prenom: response.data.prenom || "",
            mail: response.data.mail || "",
            numeroTel: response.data.numeroTel || "",
            specialite: response.data.specialite || "",
            role: getUserRole(), 
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Divisez le jeton en ses trois parties : en-tête, charge utile (payload) et signature
      const [, payload] = token.split(".");
      // Décodage de la charge utile (payload) depuis le format base64
      const decodedPayload = JSON.parse(atob(payload));
      // Extrayez le rôle de la charge utile (payload) décodée
      return decodedPayload.role;
    }
    return "";
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfileData((prevData) => ({
      ...prevData,
      photo: file,
    }));

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        const formData = new FormData();
        Object.entries(profileData).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const response = await axios.put(`http://localhost:3700/users/updateUtilisateur/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Profile updated successfully:", response.data);
        setSuccessOpen(true);
      } else {
        console.error("User ID not defined.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem", minHeight: "calc(100vh - 64px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form style={{ maxWidth: "500px", width: "100%" }} onSubmit={handleSubmit}>
          <Typography variant="h5" align="center" gutterBottom>
            Update Profile for {profileData.nom}
          </Typography>
          {photo && <img src={photo} alt="Uploaded" style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "1rem" }} />}
          <TextField
            fullWidth
            label="Nom"
            name="nom"
            value={profileData.nom}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          {profileData.role === "Student" && (
            <TextField
              fullWidth
              label="Prénom"
              name="prenom"
              value={profileData.prenom}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
          )}
          <TextField
            fullWidth
            label="Mail"
            name="mail"
            value={profileData.mail}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Spécialité"
            name="specialite"
            value={profileData.specialite}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          {["Company", "Staff"].includes(profileData.role) && (
            <>
              <TextField
                fullWidth
                label="Nom de l'entreprise"
                name="companyName"
                value={profileData.companyName}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Domaine"
                name="domaine"
                value={profileData.domaine}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </>
          )}
          <input type="file" accept="image/jpeg, image/jpg, image/png" onChange={handlePhotoChange} />
          <Button type="submit" variant="contained" color="primary" className="custom-button" fullWidth>
            Mettre à jour
          </Button>
        </form>
      </div>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessOpen(false)}
        message="Profil mis à jour avec succès!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <Footer />
    </>
  );
};
  


export default UpdateProfile;
