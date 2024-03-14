import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import mongoose from "mongoose";
import "./BEntretien.scss";
import React, { useState, useEffect } from "react";

const EntretienSchema = new mongoose.Schema({
  id_candidature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidature",
  },
  date_debut: {
    type: Date,
    default: Date.now,
  },
  date_fin: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["en ligne", "en présentiel"],
    default: "en présentiel",
  },
});

function BEntretien() {
  const [entretien, setEntretien] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedEntretien, setSelectedEntretien] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3700/entretiens/getAllEntretiens"
      );
      setEntretien(response.data);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des entretiens :",
        error
      );
    }
  };

  const onUpdate = (entretien) => {
    setSelectedEntretien(entretien);
    setShow(true);
  };

  const handleUpdate = async (updatedEntretien) => {
    try {
      const response = await axios.put(
        `http://localhost:3700/entretiens/updateEntretien/${updatedEntretien._id}`,
        updatedEntretien
      );
      setMessage(response.data.message);
      setShow(false);
      fetchData(); // Refetch data after update
    } catch (error) {
      console.error("Error updating entretien:", error);
    }
  };

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entretien?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3700/entretiens/deleteEntretien/${id}`
        );
        setMessage(response.data.message);
        setShow(true);
        fetchData(); // Refetch data after deletion
        setTimeout(() => setShow(false), 3000);
      } catch (error) {
        console.error("Error deleting entretien:", error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="BEntretien">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="entretiens-list">
          <h2>Liste des Entretiens</h2>
          <table className="entretiens-table">
            <thead>
              <tr>
                <th>ID Candidature</th>
                <th>Date début</th>
                <th>Date fin</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entretien.map((item) => (
                <tr key={item._id}>
                  <td>{item.id_candidature}</td>
                  <td>{formatDate(item.date_debut)}</td>
                  <td>{formatDate(item.date_fin)}</td>
                  <td
                    className={
                      item.type === "en ligne" ? "en-ligne" : "en-presentiel"
                    }
                  >
                    {item.type}
                  </td>
                  <td>
                    <button
                      className="deleteButton"
                      onClick={() => onDelete(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="updateButton"
                      onClick={() => onUpdate(item)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {show && (
        <Popup
          entretien={selectedEntretien}
          handleUpdate={handleUpdate}
          setShow={setShow}
        />
      )}
    </div>
  );
}

const Popup = ({ entretien, handleUpdate, setShow }) => {
  const [updatedEntretien, setUpdatedEntretien] = useState(entretien);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEntretien({ ...updatedEntretien, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedEntretien);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Update Entretien</h3>
        <form onSubmit={handleSubmit}>
          <label>ID Candidature:</label>
          <input
            type="text"
            name="id_candidature"
            value={updatedEntretien.id_candidature}
            onChange={handleChange}
          />
          <label>Date début:</label>
          <input
            type="datetime-local"
            name="date_debut"
            value={updatedEntretien.date_debut}
            onChange={handleChange}
          />
          <label>Date fin:</label>
          <input
            type="datetime-local"
            name="date_fin"
            value={updatedEntretien.date_fin}
            onChange={handleChange}
          />
          <label>Type:</label>
          <select
            name="type"
            value={updatedEntretien.type}
            onChange={handleChange}
          >
            <option value="en ligne">En ligne</option>
            <option value="en présentiel">En présentiel</option>
          </select>
          <button type="submit">Update</button>
          <button onClick={() => setShow(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default BEntretien;
