import React from "react";
import ListOffers from "../../../frontoffice/layout/offer/ListOffers";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const ListOfferBack = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ListOffers />
      </div>
    </div>
  );
};

export default ListOfferBack;
