import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../pages/Navbar';
import Footer from '../../pages/footer';
import InputGroup from './inputGroup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Entretien() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_candidature: '',
    date_debut: '',
    date_fin: '',
    type: 'en présentiel' // Default value
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const confirmation = await Swal.fire({
      title: 'Êtes-vous sûr de vouloir ajouter cet entretien ?',
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
          title: 'Date invalide',
          text: 'Veuillez sélectionner une date future pour Date début',
        });
        return; // Stop execution if the selected date is before the current date
      }

      const dateDebut = new Date(formData.date_debut);
      const dateFin = new Date(formData.date_fin);
      const halfHourLater = new Date(dateDebut.getTime() + 30 * 60000); // 30 minutes later

      if (dateFin <= dateDebut || dateFin < halfHourLater) {
        throw new Error('Date fin doit être au moins une demi-heure après Date début');
      }

      const interval = (dateFin - dateDebut) / (1000 * 60 * 60); // Difference in hours
      if (interval > 5) {
        throw new Error("L'intervalle entre la date de début et la date de fin ne peut pas dépasser 5 heures");
      }

      const isoFormData = {
        ...formData,
        date_debut: dateDebut.toISOString(),
        date_fin: dateFin.toISOString()
      };

      const response = await axios.post('http://localhost:3700/entretiens/createEntretien', isoFormData);
      console.log(response.data);
      setFormData({
        id_candidature: '',
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

  return (
    <div>
      <Navbar />
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Entretien</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form onSubmit={onSubmitHandler}>
                <div className="right">
                  <div className="w-1/2">
                    <InputGroup
                      label="ID Candidature"
                      type="text"
                      name="id_candidature"
                      onChangeHandler={onChangeHandler}
                      value={formData.id_candidature}
                    />
                  </div>

                  <div className="w-1/2">
                    <InputGroup
                      label="Date début"
                      type="datetime-local"
                      name="date_debut"
                      onChangeHandler={onChangeHandler}
                      value={formData.date_debut}
                    />
                  </div>

                  <div className="w-1/2">
                    <InputGroup
                      label="Date fin"
                      type="datetime-local"
                      name="date_fin"
                      min={formData.date_debut}
                      onChangeHandler={onChangeHandler}
                      value={formData.date_fin}
                    />
                  </div>

                  <div className="w-1/2">
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
                    <button type="submit">Envoyer</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Entretien;
