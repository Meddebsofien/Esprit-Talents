import React, { useState, useEffect } from 'react';

import './updateStaff.scss';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { Input } from '@mui/base';
const UpdateStaff = () => {
  const { userId } = useParams();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
   
    nom: "",
    prenom: "",
    password: "",
    mail: "",
    role: "Staff"
  });

  useEffect(() => {
    fetch(`http://localhost:3700/users/getutilisateur/${userId}`)
      .then(response => response.json())
      .then(data => {
        setFormData(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }
    )
    );
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3700/users/updateUtilisateur/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        navigate('/admin/users/StaffList');
      } else {
        console.error('Failed to update Staff User');
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topStaff">
          <h1>Update Staff Information</h1>
        </div>
        <div className="bottomStaff">
          <div className="right">
            <form onSubmit={handleSubmit} className="form">
              <div className="column">
                <div className="formInput centered">
                  <label>First Name</label>
                  <Input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                </div>

                <div className="formInput centered">
                  <label>Last Name</label>
                  <Input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                  />
                </div>

                <div className="formInput centered">
                  <label>Email</label>
                  <Input
                    type="email"
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" style={{ justifyContent: 'center' }}>Update</button>

              </div>

           </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStaff;
