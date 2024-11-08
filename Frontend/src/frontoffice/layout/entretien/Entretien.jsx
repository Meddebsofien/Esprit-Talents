import React, { Component, useState } from 'react';
import axios from 'axios';
import Navbar from '../../pages/Navbar';
import Footer from '../../pages/footer';
import InputGroup from './inputGroup';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

function Entretien() {
  const [text, setText] = useState({
    recipient: '',
    textmessage: ''
  });

  const sendText = () => {
    // Pass variables within the query string
    fetch(`http://localhost:3700/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
      .catch(err => console.error(err))
  }

  const navigate = useNavigate();
  const { candidatureId } = useParams();
  const [formData, setFormData] = useState({
    date_debut: '',
    date_fin: '',
    type: 'en présentiel' // Default value
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const confirmation = await Swal.fire({
      title: 'are you sure you want to add this interview ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    try {
      const currentDate = new Date();
      const selectedDate = new Date(formData.date_debut);

      // Check if the selected date is before the current system date
      if (selectedDate <= currentDate.setHours(0, 0, 0, 0)) {
        // Show error message using Swal
        Swal.fire({
          icon: 'error',
          title: 'invalid Date',
          text: 'please select a date in the future',
        });
        return; // Stop execution if the selected date is before the current date
      }

      const dateDebut = new Date(formData.date_debut);
      const dateFin = new Date(formData.date_fin);
      const halfHourLater = new Date(dateDebut.getTime() + 30 * 60000); // 30 minutes later

      if (dateFin <= dateDebut || dateFin < halfHourLater) {
        throw new Error('End date must be atleast after 30 mins of start date');
      }

      const interval = (dateFin - dateDebut) / (1000 * 60 * 60); // Difference in hours
      if (interval > 5) {
        throw new Error("L'intervalle entre la date de début et la date de fin ne peut pas dépasser 5 heures");
      }

      const isoFormData = {
        ...formData,
        id_candidature: candidatureId,
        date_debut: dateDebut.toISOString(),
        date_fin: dateFin.toISOString()
      };

      const response = await axios.post('http://localhost:3700/entretiens/createEntretien', isoFormData);
      console.log(response.data);
      setFormData({
        date_debut: '',
        date_fin: '',
        type: 'en présentiel'
      });
      Swal.fire({
        icon: 'success',
        title: 'Entretien ajouté avec succès',
        showConfirmButton: false,
        timer: 2000
      });
      //  navigate("/Entreprise/offers");
    } catch (error) {
      console.error('Error submitting entretien:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: `Échec d'ajout de l'entretien: ${error.message}`,
      });
    }
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const spacer = {
    margin: 8
  };

  const textAreaStyle = {
    borderRadius: 4
  };

  return (
    <div>
      <Navbar />
      <div className="new" style={spacer}>
        <div className="newContainer">
          <div className="top">
            <h1>Entretien</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form onSubmit={onSubmitHandler}>
                <div className="right">
                  <div className="w-1/2">
                    <input type="hidden" name="id_candidature" value={candidatureId} />
                  </div>

                  <div className="w-1/2">
                    <InputGroup
                      label="Start Date"
                      type="datetime-local"
                      name="date_debut"
                      onChangeHandler={onChangeHandler}
                      value={formData.date_debut}
                    />
                  </div>

                  <div className="w-1/2">
                    <InputGroup
                      label="End Date"
                      type="datetime-local"
                      name="date_fin"
                      min={formData.date_debut}
                      onChangeHandler={onChangeHandler}
                      value={formData.date_fin}
                    />
                  </div>

                  <div className="w-1" style={{ width:'300px'}}>
                    <InputGroup
                      label="Type"
                      type="select"
                      name="type"
                      onChangeHandler={onChangeHandler}
                      value={formData.type}
                    >
                      <option value="en ligne">En ligne</option>
                      <option value="en présentiel">En présentiel</option>
                    </InputGroup>
                  </div>
                </div>

                <div className="left">
                  <div className="col-lg-4 col-md-6 footer-newsletter">
                    <button type="submit" style={{ width:'200px' , paddingRight:'5%'}}>Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="card" style={spacer}>
        <div className="card-header">
          <h2 className="card-title">Send SMS message</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              className="form-control form-control-sm"
              value={text.recipient}
              onChange={(e) => setText({ ...text, recipient: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className="form-control"
              rows={3}
              value={text.textmessage}
              style={textAreaStyle}
              onChange={(e) => setText({ ...text, textmessage: e.target.value })}
            />
          </div>
          <button className="btn btn-danger" onClick={sendText}>
            Send SMS
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Entretien;
