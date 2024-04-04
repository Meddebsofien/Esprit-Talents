import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

const UpdateProfile = () => {
  const { userId } = useParams(); // Récupère l'ID utilisateur de l'URL
  const [profileData, setProfileData] = useState({
    nom: "",
    prenom: "",
    mail: "",
    specialite: "",
    photo: "",
    password: "",
    companyName: "",
    domaine: "",
    numeroTel: "",
    photo: null,
  });
  const [photoURL, setPhotoURL] = useState(null);
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3700/users/getutilisateur/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setProfileData({
            nom: response.data.nom || "",
            numeroTel: response.data.numeroTel || "",
            specialite: response.data.specialite || "",
            mail: response.data.mail || "",
            photo: response.data.photo || "",
            password: response.data.password || "",
            companyName: response.data.companyName || "",

            domaine: response.data.domaine || "",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

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
      setPhotoURL(reader.result); // Set photoURL state with the data URL
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        const response = await axios.put(
          `http://localhost:3700/users/updateUtilisateur/${userId}`,
          profileData
        );
        console.log("Profile updated successfully:", response.data);
        // Mettre à jour l'état de l'utilisateur si nécessaire
      } else {
        console.error("User ID not defined.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Update Profile
          </Typography>
          {photoURL && (
            <img
              src={photoURL}
              alt="Uploaded"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "1rem",
              }}
            />
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nom"
              name="nom"
              value={profileData.nom}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
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

            {profileData.role === "student" && (
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
            {["entreprise", "staff"].includes(profileData.role) && (
              <>
                <TextField
                  fullWidth
                  label="Nom de l'entreprise"
                  name="nomEntreprise"
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
            <input
              type="file"
              accept="image/jpeg, image/jpg,image/png"
              onChange={handlePhotoChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Mettre à jour
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UpdateProfile;
