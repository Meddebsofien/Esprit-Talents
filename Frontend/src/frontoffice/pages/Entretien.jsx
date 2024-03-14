import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './footer';

function Entretien() {
  const [formData, setFormData] = useState({
    id_candidature: '',
    date_debut: '',
    date_fin: '',
    type: 'en présentiel' // Default value
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("Are you sure you want to add this entretien?");
    if (confirmation) {
      try {
        // Convert date values to ISO format
        const isoFormData = {
          ...formData,
          date_debut: new Date(formData.date_debut).toISOString(),
          date_fin: new Date(formData.date_fin).toISOString()
        };
  
        const response = await axios.post('http://localhost:3700/entretiens/createEntretien', isoFormData);
        console.log(response.data); // Assuming you want to log the response
        // Clear the form after successful submission
        setFormData({
          id_candidature: '',
          date_debut: '',
          date_fin: '',
          type: 'en présentiel' // Reset type to default value
        });
        window.alert('Entretien added successfully');
      } catch (error) {
        console.error('Error submitting entretien:', error);
        window.alert('Failed to add entretien');
      }
    }
  };
  return (
    <div>
      <Navbar />
      <section id="entretien" className="py-5">
        <div className="container">
          <h3 className="mb-4"><strong>Entretien</strong></h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="id_candidature">ID Candidature</label>
                  <input type="text" id="id_candidature" name="id_candidature" className="form-control custom-input" style={{ borderColor: 'red' }} value={formData.id_candidature} onChange={handleChange} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="date_debut">Date début</label>
                  <input type="date" id="date_debut" name="date_debut" className="form-control custom-input" style={{ borderColor: 'red' }} value={formData.date_debut} onChange={handleChange} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="date_fin">Date fin</label>
                  <input type="date" id="date_fin" name="date_fin" className="form-control custom-input" style={{ borderColor: 'red' }} value={formData.date_fin} onChange={handleChange} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select id="type" name="type" className="form-control custom-input" style={{ borderColor: 'red' }} value={formData.type} onChange={handleChange}>
                    <option value="en ligne">En ligne</option>
                    <option value="en présentiel">En présentiel</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Entretien;