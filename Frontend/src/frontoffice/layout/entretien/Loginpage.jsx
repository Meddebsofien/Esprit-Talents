import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@leecheuk/react-google-login';
import { gapi } from "gapi-script";
import axios from 'axios';
import Navbar from "../../pages/Navbar";
import Footer from "../../pages/footer";
import { TextField, Button, Typography, Grid, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

function Loginpage() {
  const responseGoogle = (response) => {
    console.log(response);
    const { code } = response;
    axios.post('http://localhost:3700/entretiens/create-tokens', { code })
      .then(response => {
        console.log(response.data);
        setSignedIn(true);
      })
      .catch(error => console.log(error.message));
  };

  const responseError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "378674684451-92bus170ne1jlv9tn64ontuqtcopi32i.apps.googleusercontent.com",
        scope: 'openid https://www.googleapis.com/auth/calendar',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the time difference in milliseconds
    const startDateTime = new Date(date_debut).getTime();
    const endDateTime = new Date(date_fin).getTime();
    const timeDiff = Math.abs(endDateTime - startDateTime);

    // Convert milliseconds to hours
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    // Check if the time difference is within the range
    if (hoursDiff < 0.5 || hoursDiff > 5) {
      Swal.fire(
        'Error!',
        'Le temps entre la date de début et la date de fin doit être compris entre une demi-heure et 5 heures..',
        'error'
      );
      return;
    }

    // Check if the start date is after the current system date
    const systemDate = new Date();
    if (startDateTime < systemDate.getTime()) {
      Swal.fire(
        'Error!',
        'La date de début doit être dans le futur.',
        'error'
      );
      return;
    }

    // If all validations pass, proceed with form submission
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to create this event?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:3700/entretiens/create-event', {
          summary,
          description,
          type,
          location,
          date_debut,
          date_fin,
        })
          .then(async (response) => {
            console.log(response.data);
            Swal.fire(
              'Success!',
              'Event created successfully.',
              'success'
            );
            
            // After successfully adding the event to Google Calendar, make a request to the backend
            // endpoint to add the event to the database
            try {
              const isoFormData = {
                id_candidature: '65ed64d4a1c8ec4bca9bc35d',
                date_debut,
                date_fin,
                type,
              };
              const databaseResponse = await axios.post('http://localhost:3700/entretiens/createEntretien', isoFormData);
              console.log(databaseResponse.data);
            } catch (error) {
              console.error('Error adding event to the database:', error.message);
            }
          })
          .catch(error => {
            console.log(error.message);
            Swal.fire(
              'Error!',
              'Failed to create event.',
              'error'
            );
          });
      }
    });
  };

  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [date_debut, setDate_debut] = useState('');
  const [date_fin, setDate_fin] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [signedin, setSignedIn] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="Loginpage">
        <Typography variant="h1">Google Calendar</Typography>
      </div>
      {
        !signedin ? (
          <div>
            <GoogleLogin
              clientId="378674684451-92bus170ne1jlv9tn64ontuqtcopi32i.apps.googleusercontent.com"
              buttonText="Sign in & authorize Calendar"
              onSuccess={responseGoogle}
              onFailure={responseError}
              cookiePolicy={'single_host_origin'}
              responseType="code"
              accessType="offline"
              scope="openid https://www.googleapis.com/auth/calendar"
            />
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Summary"
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    onFocus={() => setFocusedInput("summary")}
                    onBlur={() => setFocusedInput(null)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    onFocus={() => setFocusedInput("location")}
                    onBlur={() => setFocusedInput(null)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    onFocus={() => setFocusedInput("description")}
                    onBlur={() => setFocusedInput(null)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Date debut"
                    type="datetime-local"
                    value={date_debut}
                    onChange={e => setDate_debut(e.target.value)}
                    onFocus={() => setFocusedInput("date_debut")}
                    onBlur={() => setFocusedInput(null)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Date fin"
                    type="datetime-local"
                    value={date_fin}
                    onChange={e => setDate_fin(e.target.value)}
                    onFocus={() => setFocusedInput("date_fin")}
                    onBlur={() => setFocusedInput(null)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Type"
                    select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    fullWidth
                    variant="outlined"
                  >
                    <MenuItem value="en ligne">En ligne</MenuItem>
                    <MenuItem value="presentiel">Présentiel</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant="contained" sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Créer entretien</Button>
                </Grid>
              </Grid>
            </form>
          </div>
        )
      }
     <Footer/>
    </div>
  );
}

export default Loginpage;
