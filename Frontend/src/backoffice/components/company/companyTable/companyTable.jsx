import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';


import './companyTable.scss'

const CompanyTable = () => {

  const navigate = useNavigate();

  const [companyUsers, setCompanyUsers] = useState([]);

  useEffect(() => {
    // Fetch company users from the server
    axios.get('http://localhost:3700/users/users/Company')
      .then(response => setCompanyUsers(response.data))
      .catch(error => console.error('Error fetching company users:', error));
  }, []);

  const handleDelete = async (userId) => {
    try {
      // Make an HTTP request to delete the user with userId
      const response = await axios.delete(`http://localhost:3700/users/deleteUtilisateur/${userId}`);

      if (response.status === 204) {
        // User deleted successfully, update the state or fetch the updated user list
        console.log('User deleted successfully');

        // Fetch the updated user list or update the state as needed
        const updatedUsers = companyUsers.filter((user) => user._id !== userId);
        setCompanyUsers(updatedUsers);
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };


  const handleUpdate = (userId) => {
    navigate(`/admin/users/updateCompany/${userId}`); // Navigation vers la page de mise à jour avec l'ID de l'utilisateur
  };

  const columns = [
    { field: 'nom', headerName: 'Name', flex: 1 },
    { field: 'prenom', headerName: 'Lastname', flex: 1 },

    { field: 'companyName', headerName: 'Company Name', flex: 1 },
    { field: 'numeroTel', headerName: 'Phone Number', flex: 1 },
    { field: 'mail', headerName: 'Email', flex: 1 },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={() => handleUpdate(params.row._id)} // Appel de la fonction handleUpdate avec l'ID de l'utilisateur
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ marginTop: '5%', marginLeft: '2%' }}>
      <h2>Company Users</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>

      <Button
  variant="contained"
  onClick={() => navigate('/admin/users/NewCompany')} 
  
  color="success"
  style={{ marginLeft: 'auto', marginRight: '2%' }}
>
  Add Company
</Button>

      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={companyUsers}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id} // Specify the ID field
        />
      </div>
    </div>
  );
};

export default CompanyTable;
