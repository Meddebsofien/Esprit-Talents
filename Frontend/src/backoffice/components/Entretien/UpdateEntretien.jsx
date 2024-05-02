import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Typography } from '@mui/material';
import "./UpdateEntretien.scss";

function UpdateEntretien() {
  const navigate = useNavigate();
  const { entretienId } = useParams();
  const [updatedEntretien, setUpdatedEntretien] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntretien = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3700/entretiens/getEntretienById/${entretienId}`
        );
        setUpdatedEntretien(response.data);
      } catch (error) {
        console.error("Error fetching entretien:", error);
        setError("Error fetching entretien");
      }
    };

    fetchEntretien();
  }, [entretienId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEntretien({ ...updatedEntretien, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { date_debut, date_fin, type } = updatedEntretien;
      const updatedData = { date_debut, date_fin, type };

      const interval = (new Date(date_fin) - new Date(date_debut)) / (1000 * 60 * 60);

      if (interval > 5) {
        throw new Error("the interview can't be longer than 5 hours");
      }

      await axios.put(
        `http://localhost:3700/entretiens/updateEntretien/${entretienId}`,
        updatedData
      );
      alert('Entretien updated successfully!');
      navigate("/admin/BEntretien"); // Navigate to the specified route
    } catch (error) {
      console.error("Error updating entretien:", error);
      setError(error.message);
    }
  };

  if (!updatedEntretien) {
    return <div>Loading...</div>;
  }

  return (
    <div className="BEntretien">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">Entretien ID: {entretienId}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1">Update Entretien</Typography>
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography variant="body1" color="error">{error}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="start date"
                  name="date_debut"
                  type="datetime-local"
                  value={updatedEntretien.date_debut}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  inputProps={{ min: new Date().toISOString().slice(0, 16) }} // Set min to current date and time
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="End date"
                  name="date_fin"
                  type="datetime-local"
                  value={updatedEntretien.date_fin}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  inputProps={{ min: updatedEntretien.date_debut }} // Set min to the value of "Date début"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Type</InputLabel>
                  <Select
                    label="Type"
                    name="type"
                    value={updatedEntretien.type}
                    onChange={handleChange}
                  >
                    <MenuItem value="en ligne">En ligne</MenuItem>
                    <MenuItem value="en présentiel">On Site</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="outlined" className="UpdateButton">Update</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Link to="/admin/BEntretien">Back to Interview List</Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default UpdateEntretien;
