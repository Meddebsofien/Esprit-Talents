import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./listeCandidatures.css";

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
  InputLabel,
  FormControl,
  OutlinedInput,
  Tooltip,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { deepOrange, deepPurple } from "@mui/material/colors";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import Footer from "../../pages/footer";
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
  const [topToAccept, setTopToAccept] = useState(0);
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState("");

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

    const fetchOneCandidacy = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3700/candidatures/one/${param.id}`
        );
        setDisplay(response.data.exist);
        console.log("display : ", display);
      } catch (error) {
        console.error("Error fetching one candidacy:", error);
      }
    };

    fetchCandidatures();
    fetchOneCandidacy();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      setError("Please enter only letters and spaces");
    } else {
      setError("");
      setSearchText(value);
    }
  };

  const handleAcceptTopCandidacies = async () => {
    console.log(topToAccept);
    if (topToAccept > 0) {
      try {
        await axios.put(
          `http://localhost:3700/candidatures/aceept-top-candidacies/${topToAccept}/${param.id}`
        );

        setCandidatures((prevCandidatures) =>
          prevCandidatures.map((c) =>
            c._id === id ? { ...c, status: "accepted" } : c
          )
        );
        setDisplay(true);
        window.location.reload();
      } catch (error) {
        console.error("Error accepting candidature:", error);
      }
    }
  };

  const handleAction = (id) => {
    // Implement your action logic here
    console.log("Action clicked for candidature id:", id);
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
          <div className="topTableBar">
            <div className="left">
              <Box>
                <FormControl fullWidth sx={{ mr: 1, width: 250 }} size="small">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Rechercher
                  </InputLabel>
                  <OutlinedInput
                    startAdornment={<SearchIcon position="start">$</SearchIcon>}
                    label="Amount"
                    value={searchText}
                    onChange={handleInputChange}
                  />
                  {error && <Typography color="error">{error}</Typography>}
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
            </div>
            <div className="right">
              <Box>
                <TextField
                  id="outlined-accepted-candidacies"
                  label="Top accepted candidacies"
                  size="small"
                  sx={{ width: 200, marginLeft: "20px" }}
                  required
                  error={!!error}
                  helperText={error}
                  value={topToAccept}
                  onChange={(e) => setTopToAccept(e.target.value)}
                  inputProps={{ inputMode: "numeric" }}
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ width: 200, marginLeft: "20px" }}
                  type="submit"
                  onClick={handleAcceptTopCandidacies}
                >
                  Accept top candidacies
                </Button>
              </Box>
            </div>
          </div>
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
                  <b> Candidacy Average</b>
                </StyledTableCell>
                <StyledTableCell>
                  <b> Profile </b>
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <b> CV</b>{" "}
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <b> Status</b>{" "}
                </StyledTableCell>
                <StyledTableCell>
                  <b> Actions</b>
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
                  <TableCell>{candidature.name}</TableCell>
                  <TableCell>{candidature.email}</TableCell>
                  <TableCell>{candidature.average_candidacy}</TableCell>
                  <TableCell>{candidature.profile_candidate}</TableCell>
                  <TableCell>
                    {candidature.cv_url && (
                      <InsertDriveFileIcon
                        onClick={() => handleFileClick(candidature.cv_url)}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={candidature?.status.toUpperCase()}
                      variant="contained"
                      size="small"
                      color={getColorVariant(candidature?.status)}
                    />
                  </TableCell>
                  <TableCell>
  <Button
    variant="contained"
    color="primary"
    size="small"
    component={Link}
    to={`/entretien/${candidature._id}`}
  >
    Action
  </Button>
                </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default CandidaturesList;
