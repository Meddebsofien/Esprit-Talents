import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import BEntretien from "../../components/Entretien/Bentretien";


const DetailsEntretien = () => {
  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar />
     <BEntretien/>
     </div>
    </div>
  );
};

export default DetailsEntretien;
