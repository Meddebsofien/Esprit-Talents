import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UpdateEntretien from "../../components/Entretien/UpdateEntretien";


const Updatepage = () => {
  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar />
     <UpdateEntretien/>
     </div>
    </div>
  );
};

export default Updatepage;
