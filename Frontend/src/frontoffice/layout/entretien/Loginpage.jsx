import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@leecheuk/react-google-login';
import { gapi } from "gapi-script";
import axios from 'axios';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data to be sent:", { summary, description, type, date_debut, date_fin,location });
    axios.post('http://localhost:3700/entretiens/create-event', {
      summary,
      description,
      type,
      location,
      date_debut,
      date_fin,
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => console.log(error.message));
  };

  const [location,setLocation]=useState('')
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [date_debut, setDate_debut] = useState('');
  const [date_fin, setDate_fin] = useState('');
  const [signedin, setSignedIn] = useState(false);

  return (
    <div>
      <div className="Loginpage">
        <h1>Google Calendar</h1>
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
                <label htmlFor='summary'>Summary</label>
                <br />
                <input type='text' id='summary' value={summary} onChange={e => setSummary(e.target.value)}></input>
                <br />
                <label htmlFor='location'>location</label>
                <br />
                <input type='text' id='location' value={location} onChange={e => setLocation(e.target.value)}></input>
                <br />
                <label htmlFor='description'>Description</label>
                <br />
                <input type='text' id='description' value={description} onChange={e => setDescription(e.target.value)}></input>
                <br />
                <label htmlFor='date_debut'>Date debut</label>
                <br />
                <input type='datetime-local' id='date_debut' value={date_debut} onChange={e => setDate_debut(e.target.value)}></input>
                <br />
                <label htmlFor='date_fin'>Date fin</label>
                <br />
                <input type='datetime-local' id='date_fin' value={date_fin} onChange={e => setDate_fin(e.target.value)}></input>
                <br />
                <button type='submit'>Creer entretien</button>
              </form>
            </div>
          )
      }
    </div>
  );
}

export default Loginpage;
