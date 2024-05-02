import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import the XLSX library for Excel file generation

import './companyTable.scss';

const CompanyTable = () => {
  const navigate = useNavigate();

  const [companyUsers, setCompanyUsers] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    image: null,
  });
  const [blurBackground, setBlurBackground] = useState(false); // State to control background blur

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
    navigate(`/admin/users/updateCompany/${userId}`);
  };

  // Function to handle downloading data as Excel file
  const handleDownloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(companyUsers);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Company Users');
    XLSX.writeFile(workbook, 'company_users.xlsx');
  };

  // Function to handle form submission
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      // Create a FormData object
      const formDataToSend = new FormData();
      // Append form data to the FormData object
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('image', formData.image);

      // Send form data to the server using axios
      const response = await axios.post('http://localhost:3700/contact/companies', formDataToSend);
      console.log('Response from server:', response.data);
      // Reset form data
      setFormData({
        subject: '',
        message: '',
        image: null,
      });
      // Hide the contact form after successful submission
      setShowContactForm(false);
      // Set background blur to false after form submission
      setBlurBackground(false);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const columns = [
    { 
      field: 'fullName', 
      headerName: 'Full Name', 
      flex: 1,
      valueGetter: (params) => `${params.row.nom} ${params.row.prenom}` // Combine "nom" and "prenom" fields
    },
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
            onClick={() => handleUpdate(params.row._id)}
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
          <Button
            variant="outlined"
            onClick={handleDownloadExcel} // Call the handleDownloadExcel function when the "Excel" button is clicked
          >
            Excel
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ marginTop: '5%', marginLeft: '2%', position: 'relative' }}>
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

        <Button
          variant="contained"
          onClick={() => {
            setShowContactForm(true); // Show the contact form
            setBlurBackground(true); // Blur the background
          }}
          color="primary"
        >
          Contact Companies
        </Button>
      </div>
      {showContactForm && (
        <Card
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            backgroundColor: '#fff', // Background color of the card
            borderRadius: '10px', // Border radius of the card
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Box shadow of the card
            zIndex: '999', // Higher z-index to make it appear on top
            padding: '20px', // Padding of the card content
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Contact Form
            </Typography>
            <form onSubmit={handleSubmitForm}>
              {/* Input fields for subject, mail content, and image upload */}
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} // Styles for input fields
              />
              <textarea
                placeholder="Mail Content"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} // Styles for textarea
              />
              <input
                type="file"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                style={{ marginBottom: '10px' }} // Margin bottom for file input
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      <div style={{ height: 600, width: '100%', filter: blurBackground ? 'blur(5px)' : 'none' }}>
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
