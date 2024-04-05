import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../frontoffice/pages/Navbar";
import NavbarStaff from "../../frontoffice/pages/NavbarStaff";
import Footer from "../../frontoffice/pages/footer";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
} from "@mui/material";
import NavbarEntreprise from "../../frontoffice/pages/NavbarEntreprise.";

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
    photo: "",
    role: "",
  });

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
          console.log("User data response:", response.data); // Ajoutez ce log pour vérifier la réponse des données utilisateur
          setProfileData((prevData) => ({
            ...prevData,
            nom: response.data.nom || "",
            prenom: response.data.prenom || "",
            mail: response.data.mail || "",
            numeroTel: response.data.numeroTel || "",
            specialite: response.data.specialite || "",
            role: getUserRole(),
            photo: response.data.photo || "", // Assurez-vous que la propriété photo contient bien l'URL de la photo
            password: response.data.password || "",
            companyName: response.data.companyName || "",
            domaine: response.data.domaine || "",
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);
  // Dépendance du useEffect, déclenche le chargement à chaque changement de userId

  const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const [, payload] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        const formData = new FormData();
        formData.append("photo", profileData.photo);
        const photoResponse = await axios.post(
          "http://localhost:3700/users/upload-photo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const photo = photoResponse.data.photo; // Utilisez photoResponse.data plutôt que photoResponse.data.photoURL

        const updatedProfileData = { ...profileData, photo: photo };

        const response = await axios.put(
          `http://localhost:3700/users/updateUtilisateur/${userId}`,
          updatedProfileData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

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
      <div>
        {profileData.role === "Company" && <NavbarEntreprise />}
        {profileData.role === "Student" && <Navbar />}
        {profileData.role === "Staff" && <NavbarStaff />}
      </div>
      <div
        style={{
          padding: "2rem",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          style={{ maxWidth: "500px", width: "100%" }}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Typography variant="h5" align="center" gutterBottom>
            Update Profile for {profileData.nom}
          </Typography>
          {profileData.photo && (
            <img
              src={profileData.photo}
              alt="Uploaded"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "1rem",
              }}
            />
          )}

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
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handlePhotoChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="custom-button"
            fullWidth
          >
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
