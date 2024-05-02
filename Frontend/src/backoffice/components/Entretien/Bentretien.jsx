import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import './BEntretien.scss';

const BEntretien = () => {
  const [entretien, setEntretien] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3700/entretiens/getAllEntretiens');
      setEntretien(response.data);
    } catch (error) {
      console.error('Error fetching entretiens:', error);
    }
  };

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entretien?')) {
      try {
        await axios.delete(`http://localhost:3700/entretiens/deleteEntretien/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting entretien:', error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredEntretien = entretien.filter((item) => (filterType ? item.type === filterType : true));

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBySearchTerm = filteredEntretien.filter((item) => item.id_candidature.includes(searchTerm));

  const columns = [
    { field: 'id_candidature', headerName: 'ID Candidature', flex: 1 },
    { field: 'date_debut', headerName: 'Date début', flex: 1, valueFormatter: ({ value }) => formatDate(value) },
    { field: 'date_fin', headerName: 'Date fin', flex: 1, valueFormatter: ({ value }) => formatDate(value) },
    { field: 'type', headerName: 'Type', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Link to={`/admin/UpdateEntretien/${params.row._id}`}>
            <Button variant="outlined" className="UpdateButton">Update</Button>
          </Link>
          <Button
            className="DeleteButton"
            variant="outlined" 
            color="error" 
            onClick={() => onDelete(params.row._id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ marginTop: '5%', marginLeft: '2%' }}>
      <h2>Liste des Entretiens</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by ID Candidature"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <select value={filterType} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="en ligne">En ligne</option>
          <option value="en présentiel">En présentiel</option>
        </select>
      </div>
      <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={filteredBySearchTerm}
        columns={columns}
        disableColumnMenu
        getRowId={(row) => row._id} 

      />
    </div>    
    </div>
  );
};

export default BEntretien;
