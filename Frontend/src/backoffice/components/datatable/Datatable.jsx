import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const CompanyTable = () => {
  const [companyUsers, setCompanyUsers] = useState([]);

  useEffect(() => {
    // Fetch company users from the server
    axios.get('http://localhost:3700/users/users/Company')
      .then(response => setCompanyUsers(response.data))
      .catch(error => console.error('Error fetching company users:', error));
  }, []);

  const columns = [
    { field: 'nom', headerName: 'Nom', flex: 1 },
    { field: 'companyName', headerName: 'Company Name', flex: 1 },
    { field: 'numeroTel', headerName: 'Phone Number', flex: 1 },
    { field: '', headerName: 'Actions', flex: 1 },

    // Add more columns for other user attributes
  ];

  return (
    <div style={{margin:"2%"}}>
      <h2>Company Users</h2>
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
