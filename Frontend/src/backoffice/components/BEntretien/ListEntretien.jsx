import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import Datatable from "../datatable/Datatable";
import { Outlet } from "react-router-dom";
import axios from "axios";
import mongoose from "mongoose";
import "./BEntretien.scss";
import React, { useEffect } from "react";


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

function BEntretien(){
  
  const Ondelete = (id)=>{
    if(window.confirm("are you sure to delete this application?")){
     axios.delete(`http://localhost:3700/entretiens/deleteEntretien/${id}`)
     .then(res=>setMessage(res.data.message))
     setShow(true)
     setTimeout(()=>setShow(false),3000)
    }
  }
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3700/entretiens/getAllEntretiens",
          FormData);
          console.log("message");
        setEntretien(response.data);
      } catch (error) {
        
        console.error(
          "Une erreur s'est produite lors de la récupération des entretiens :",
          error
        );
      }
    };

    fetchData();
  });

  return (
    <div className="BEntretien">
    <div className="sidebar">
    <Sidebar />
  </div>
  <div className="content">

  </div>
      <div className="navbar">
        <Navbar />
      </div>
     
    </div>
  );
}

export  default BEntretien;