import React, { useState } from "react";
import axios from "axios";

function UpdateEntretienForm({ entretien, onUpdate }) {
  const [updatedEntretien, setUpdatedEntretien] = useState(entretien);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEntretien({ ...updatedEntretien, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3700/entretiens/updateEntretien/${entretien._id}`, updatedEntretien);
      onUpdate(updatedEntretien); // Update UI after successful update
    } catch (error) {
      console.error("Error updating entretien:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID Candidature:</label>
        <input
          type="text"
          name="id_candidature"
          value={updatedEntretien.id_candidature}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date début:</label>
        <input
          type="datetime-local"
          name="date_debut"
          value={updatedEntretien.date_debut}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date fin:</label>
        <input
          type="datetime-local"
          name="date_fin"
          value={updatedEntretien.date_fin}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Type:</label>
        <select
          name="type"
          value={updatedEntretien.type}
          onChange={handleInputChange}
        >
          <option value="en ligne">En ligne</option>
          <option value="en présentiel">En présentiel</option>
        </select>
      </div>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateEntretienForm;
