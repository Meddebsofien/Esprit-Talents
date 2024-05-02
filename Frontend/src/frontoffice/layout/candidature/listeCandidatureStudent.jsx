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
import NavbarEntreprise from "../../pages/NavbarEntreprise.";
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
  //const [user, setUser] = useState({});
  const [idc, setIdc] = useState("");
  const [offer, setOffer] = useState([]); 
  const [data, setData] = useState([]);

useEffect(() => {
  const fetchCandidatures = async () => {
    try {
      const token = localStorage.getItem('token');
      var decodedPayload;
      var user_id;

      if (token) {
        const [header, payload, signature] = token.split(".");
        decodedPayload = JSON.parse(atob(payload));
        user_id = decodedPayload.id;
      } else {
        console.log("Token non trouvé dans localStorage");
        throw new Error('Invalid user data or missing _id property');
      }

      const response = await axios.get(
        `http://localhost:3700/candidatures/getAllCandidatureStudent/${user_id}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (!response.data) {
        throw new Error('Empty response data');
      }
      const dataDetails = [];

      // Iterate through each candidacy object in the response
      for (const candidacy of response.data) {
          const id_offer = candidacy.offerID;
          // Make a separate API call to get offer details by ID
          const offerResponse = await axios.get(
              `http://localhost:3700/offers/getOfferById/${id_offer}`
          );

          // Create an object with desired information from both candidacy and offer
          const dataObject = {
              candidacyId: candidacy._id,
              status: candidacy.status,
              title: offerResponse.data.title,
              company: offerResponse.data.company,
              dateOffer: offerResponse.data.startDate,
              type: offerResponse.data.type
          };

          console.log("*************",dataObject.candidacyId)
          dataDetails.push(dataObject);
      }

      // Update state with the array of objects
      setData(dataDetails);

    } catch (error) {
      console.error("Error fetching candidatures:", error);
      // Handle error state or display error message to the user
    }
  };

  fetchCandidatures();
}, []);


  const onDelete = async (id) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `http://localhost:3700/candidatures/delete/${id}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    if (response.status === 200) {
      const newOffer = data.filter((item) => item._id !== id);
      setData(newOffer);
    }else{
      console.log("error")
    }
    window.location.reload();
  };
  return (
    <>
    <NavbarEntreprise/>
    <div style={{marginTop : 150,  border: "1px solid black"  }}>
    <div className="m-5" >
    
      {" "}
      <TableContainer component={Paper} className="table mt-5 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell"> Offer</TableCell>
              <TableCell className="tableCell">Company</TableCell>
              <TableCell className="tableCell">type</TableCell>
              <TableCell className="tableCell">Application Date</TableCell>

              
              <TableCell className="tableCell">Status </TableCell>
              <TableCell className="tableCell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item?._id}>
                <TableCell className="tableCell">
                  {item?.title}
                </TableCell>
                <TableCell className="tableCell">
                  {item?.company}{" "}
                </TableCell>{" "}
                <TableCell className="tableCell">{item?.type}</TableCell>
                <TableCell className="tableCell">
                  {item?.dateOffer}
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
                    onClick={() => {onDelete(item?.candidacyId) 
                        console.log(item?.candidacyId)}}
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
    </div>
    </>
  );

}

export default ListeCandidatureStudent;