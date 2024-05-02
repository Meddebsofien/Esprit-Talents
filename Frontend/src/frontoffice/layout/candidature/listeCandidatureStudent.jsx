import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Chip } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
function ListeCandidatureStudent() {
  const getColorVariant = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "default";
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };
  const [offer, setOffer] = useState([]);
  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3700/candidatures/getAllCandidatureStudent`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        console.log(response);
        setOffer(response?.data);
      } catch (error) {
        console.error("Error fetching candidatures:", error);
      }
    };

    fetchCandidatures();
  }, []);

  const onDelete = async (id) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `http://localhost:3700/candidatures/deleteCandidature/${id}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    if (response.status === 200) {
      const newOffer = offer.filter((item) => item._id !== id);
      setOffer(newOffer);
    }
  };
  return (
    <div className="m-5">
      {" "}
      <TableContainer component={Paper} className="table mt-5 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell"> Offre</TableCell>
              <TableCell className="tableCell">company</TableCell>
              <TableCell className="tableCell">Date d'application</TableCell>

              <TableCell className="tableCell">type</TableCell>
              <TableCell className="tableCell">Status Candidature</TableCell>
              <TableCell className="tableCell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offer?.map((item) => (
              <TableRow key={item?._id}>
                <TableCell className="tableCell">
                  {item?.idOffer?.title}
                </TableCell>
                <TableCell className="tableCell">
                  {item?.idOffer?.company}{" "}
                </TableCell>{" "}
                <TableCell className="tableCell">{item.date}</TableCell>
                <TableCell className="tableCell">
                  {item?.idOffer?.type}
                </TableCell>
                <TableCell className="tableCell">
                  {" "}
                  <Chip
                    label={item?.status.toUpperCase()}
                    variant="contained"
                    size="small"
                    color={getColorVariant(item?.status)}
                  />{" "}
                </TableCell>
                <TableCell className="tableCell">
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(item?._id)}
                  >
                    Delete
                  </Button>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListeCandidatureStudent;
