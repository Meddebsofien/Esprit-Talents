import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Typography,
  Container,
  Stack,
  Button,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  TextField,
  MenuItem,
  Box,
  tableCellClasses,
  TablePagination,
  InputLabel,
  FormControl,
  OutlinedInput,
  Tooltip,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';

import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { deepOrange, deepPurple } from "@mui/material/colors";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Footer from "../../pages/footer";
import Entretien from "../entretien/Entretien";

import NavbarEntreprise from "../../pages/NavbarEntreprise.";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#06142A",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
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
const Filter = [
  {
    value: "status",
    label: "Status",
  },
  {
    value: "idUser.nom",
    label: "Name",
  },
  {
    value: "idUser.mail",
    label: "Email",
  },
  {
    value: "date",
    label: "Date ",
  },
];
const CandidaturesList = () => {
  const param = useParams();
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [candidatures, setCandidatures] = useState([]);
  const handleFileClick = (fileLink) => {
    window.open(fileLink, "_blank");
  };
  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        console.log(param.id);
        const response = await axios.get(
          `http://localhost:3700/candidatures/getCandidatureById/${param.id}`
        );
        setCandidatures(response?.data);
      } catch (error) {
        console.error("Error fetching candidatures:", error);
      }
    };

    fetchCandidatures();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(
        `http://localhost:3700/candidatures/acceptCandidatureById/${id}`
      );

      setCandidatures((prevCandidatures) =>
        prevCandidatures.map((c) =>
          c._id === id ? { ...c, status: "accepted" } : c
        )
      );
    } catch (error) {
      console.error("Error accepting candidature:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:3700/candidatures/rejectCandidatureById/${id}`
      );
      setCandidatures((prevCandidatures) =>
        prevCandidatures.map((c) =>
          c._id === id ? { ...c, status: "rejected" } : c
        )
      );
    } catch (error) {
      console.error("Error rejecting candidature:", error);
    }
  };

  const filteredData = candidatures?.filter((item) => {
    if (filterValue === "") {
      return true;
    }
    if (filterValue === "status") {
      return item.status.toLowerCase().includes(searchText.toLowerCase());
    }

    if (filterValue === "date") {
      return item.date.toLowerCase().includes(searchText.toLowerCase());
    }

    if (filterValue === "idUser.nom") {
      return item?.idUser?.nom.toLowerCase().includes(searchText.toLowerCase());
    }
    if (filterValue === "idUser.mail") {
      return item?.idUser?.mail
        .toLowerCase()
        .includes(searchText.toLowerCase());
    }
    return true;
  });
  return (
    <>
      <NavbarEntreprise />
      <Container className="mt-5">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5" gutterBottom>
            Candidatures List
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" mb={5}>
          <Box>
            <FormControl fullWidth sx={{ mr: 1, width: 250 }} size="small">
              <InputLabel htmlFor="outlined-adornment-amount">
                Rechercher
              </InputLabel>
              <OutlinedInput
                startAdornment={<SearchIcon position="start">$</SearchIcon>}
                label="Amount"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="outlined-select-currency"
              select
              label="Filtre"
              size="small"
              sx={{ width: 150 }}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              {Filter.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Stack>
        <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
          <Table sx={{ minWidth: 500 }} stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <b> #</b>
                </StyledTableCell>
                <StyledTableCell>
                  <b> FullName </b>
                </StyledTableCell>

                <StyledTableCell>
                  <b> mail</b>
                </StyledTableCell>
                <StyledTableCell>
                  <b> Date </b>
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <b> CV</b>{" "}
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <b> Motivation Letter</b>{" "}
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <b> Status</b>{" "}
                </StyledTableCell>

                <StyledTableCell padding="none">
                  {" "}
                  <b> Actions </b>{" "}
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData.map((candidature, index) => (
                <StyledTableRow key={index}>
                  <TableCell>
                    {" "}
                    <Avatar
                      sx={{ width: 26, height: 26, bgcolor: deepPurple[500] }}
                    >
                      {candidature?.idUser?.nom[0].toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    {" "}
                    {candidature?.idUser?.nom +
                      " " +
                      candidature?.idUser?.prenom}
                  </TableCell>
                  <TableCell> {candidature?.idUser?.mail}</TableCell>
                  <TableCell>{candidature.date}</TableCell>
                  <TableCell>
                    {" "}
                    {candidature.cvUpload && (
                      <InsertDriveFileIcon
                        onClick={() => handleFileClick(candidature.cvUpload)}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {candidature.motivationLetterUpload && (
                      <InsertDriveFileIcon
                        onClick={() =>
                          handleFileClick(candidature.motivationLetterUpload)
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Chip
                      label={candidature?.status.toUpperCase()}
                      variant="contained"
                      size="small"
                      color={getColorVariant(candidature?.status)}
                    />
                  </TableCell>

                  <TableCell>
                    {candidature.status === "pending" && (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleAccept(candidature?._id)}
                        >
                          Accept
                        </Button>{" "}
                        &nbsp; &nbsp;
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleReject(candidature?._id)}
                        >
                          Reject
                        </Button>
                        <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        component={Link}
                        to={`/entretien/${candidature?._id}`}
                      >
                        Entretenir
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        component={Link}
                        to="/calendar"
                      >
                       google calendar 
                      </Button>

                      </>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
      </Container>
    </>
  );
};

export default CandidaturesList;
