import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidaturesList = () => {
  const idUser = '65f408ea84ab0a8f1142ad38'; // Définissez idUser ici

  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const response = await axios.get(`http://localhost:3700/candidatures/getAllCandidature`);
        console.log('response',response.data);
        setCandidatures(response.data);

      } catch (error) {
        console.error('Error fetching candidatures:', error);
      }
    };

    fetchCandidatures();
  }, []); // Laissez le tableau de dépendances vide pour exécuter useEffect une seule fois
  console.log('candidatures',candidatures)

  const handleAccept = async (idUser) => {
    try {
      await axios.put(`http://localhost:3700/candidatures/acceptCandidatureById/${idUser}`);
      
      setCandidatures((prevCandidatures) =>
        prevCandidatures.map((c) =>
          c._id === idUser? { ...c, status: 'accepted' } : c
        )
      );
    } catch (error) {
      console.error('Error accepting candidature:', error);
    }
  };

  const handleReject = async (idUser) => {
    try {
      await axios.put(`http://localhost:3700/candidatures/rejectCandidatureById/${idUser}`);
      setCandidatures((prevCandidatures) =>
        prevCandidatures.map((c) =>
          c._id === idUser ? { ...c, status: 'rejected' } : c
        )
      );
    } catch (error) {
      console.error('Error rejecting candidature:', error);
    }
  };

  return (
    <div>
      <h2>Candidatures List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Id User</th>
            <th>Id Offer</th>
            <th>Date</th>
            <th>CV</th>
            <th>Motivation Letter</th>
            <th>Status</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
        {Object.values(candidatures).map((candidature,index) => (
        <tr key={index}>
          <td>{candidature.idUser}</td> 
          <td>{candidature.idOffer}</td>
          <td>{candidature.date}</td>
          <td>{candidature.cvUpload}</td>
          <td>{candidature.motivationLetterUpload}</td>
          <td>{candidature.status}</td>

          <td>
            {candidature.status === 'pending' && (
              <>
                <button className="btn btn-success me-2" onClick={() => handleAccept(candidature.idUser)}>Accept</button>
                <button className="btn btn-danger" onClick={() => handleReject(candidature.idUser)}>Reject</button>
                </>
              )}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidaturesList;
