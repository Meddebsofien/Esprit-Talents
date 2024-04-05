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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const ListOffers = () => {
  const [offer, setOffer] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const [role, setrole] = useState("");
  const navigate = useNavigate();

  const [idc, setIdc] = useState("");

  /* on delete */

  const Ondelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3700/offers/deleteOffer/${id}`)
          .then((res) => setMessage(res.data.message));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const OnUpdate = (id) => {
    navigate(`/Entreprise/update/${id}`);
  };
  const OnView = (id) => {
    navigate(`/Entreprise/detailsentr/${id}`);
  };
  const onViewCandidatures = (id) => {
    navigate(`/Entreprise/listeCandidature/${id}`);
  };

  /* find all offers */
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const [header, payload, signature] = token.split(".");
        const decodedPayload = JSON.parse(atob(payload));
        const idcc = decodedPayload.id;
        const role = decodedPayload.role;
        setrole(role);
        try {
          const response = await axios.get(
            "http://localhost:3700/offers/getAllOffers"
          );
          console.log("idsof" + idcc);
          if (role === "admin") {
            setOffer(response.data);
          } else {
            const currentOffer = response.data.filter(
              (el) => el.createdBy === idcc
            );
            setOffer(currentOffer);
          }
        } catch (error) {
          console.error(
            "Une erreur s'est produite lors de la récupération des offres :",
            error
          );
        }
      }
    };

    fetchData();
  });

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
                <TableCell className="tableCell">experience (ans)</TableCell>
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
                  <TableRow key={_id}>
                    <TableCell className="tableCell">{title}</TableCell>
                    <TableCell className="tableCell">{company}</TableCell>
                    <TableCell className="tableCell">{location}</TableCell>
                    <TableCell className="tableCell">{type}</TableCell>
                    <TableCell className="tableCell">
                      {experience} ans
                    </TableCell>
                    <TableCell className="tableCell">
                      <button
                        className="viewButton"
                        onClick={() => OnView(_id)}
                        hidden={role === "admin" || role === "Staff"}
                      >
                        View
                      </button>{" "}
                      &nbsp;
                      <button
                        className="deleteButton"
                        onClick={() => Ondelete(_id)}
                      >
                        delete
                      </button>{" "}
                      &nbsp;
                      <button
                        hidden={role === "admin" || role === "Staff"}
                        className="editerButton"
                        onClick={() => OnUpdate(_id)}
                      >
                        Update
                      </button>
                      &nbsp; &nbsp; &nbsp;
                      <Button
                        hidden={role === "admin" || role === "Staff"}
                        variant="outlined"
                        onClick={() => onViewCandidatures(_id)}
                        size="small"
                      >
                        Candidatures
                      </Button>
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
