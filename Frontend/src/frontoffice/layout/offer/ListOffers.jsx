import React from "react";
import Navbar from "../../pages/Navbar";
import Footer from "../../pages/footer";
import axios from "axios";
import { useState, useEffect } from "react";
import RowDetails from "./Listofferscomponent";
import "../../../App.css";
import NavbarEntreprise from "../../pages/NavbarEntreprise.";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../../backoffice/components/Table/table.scss";

const ListOffers = () => {
  const [offer, setOffer] = useState([]);
  const [message, setMessage] = useState("");
  const [IdActuel, setIdActuel] = useState("65da0f60fd81c34a7c2a0767");
  const [show, setShow] = useState(false);
/* on delete */

 const Ondelete = (id)=>{
   if(window.confirm("are you sure to delete this offer?")){
    axios.delete(`http://localhost:3700/offers/deleteOffer/${id}`)
    .then(res=>setMessage(res.data.message))
    setShow(true)
    setTimeout(()=>setShow(false),3000)
   }
 }



  /* find all offers */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3700/offers/getAllOffers"
        );
        setOffer(response.data);
      } catch (error) {
        
        console.error(
          "Une erreur s'est produite lors de la récupération des offres :",
          error
        );
      }
    };

    fetchData();
  }); // Tableau de dépendances vide pour exécuter cet effet une seule fois après le montage initial
  return (
    <>
      
      <div className="ccc">
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">title</TableCell>
                <TableCell className="tableCell">company</TableCell>
                <TableCell className="tableCell">location</TableCell>
                <TableCell className="tableCell">type</TableCell>
                <TableCell className="tableCell">experience</TableCell>
                <TableCell className="tableCell">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offer.map(
                ({
                  title,
                  description,
                  company,
                  location,
                  type,
                  startDate,
                  requirements,
                  createdBy,
                  experience,
                  _id,
                }) => (
                  createdBy===IdActuel &&
                  <TableRow key={_id}>
                    <TableCell className="tableCell">{title}</TableCell>
                    <TableCell className="tableCell">{company}</TableCell>
                    <TableCell className="tableCell">{location}</TableCell>
                    <TableCell className="tableCell">{type}</TableCell>
                    <TableCell className="tableCell">
                      {experience} ans
                    </TableCell>
                    <TableCell className="tableCell">
                     <button className="viewButton">View</button> &nbsp;
                     <button className="deleteButton"   onClick={() => Ondelete(_id)}>delete</button> &nbsp;
                     <button className="editerButton">Update</button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
     
    </>
  );
};

export default ListOffers;
