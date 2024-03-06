
import { useState } from "react";
import './details.css'
import Navbar from "../../pages/Navbar";
import Footer from "../../pages/footer";
import axios from "axios";
import InputGroup from "./inputGroup";
import NavbarEntreprise from "../../pages/NavbarEntreprise.";
const AjouterOffer = ({ inputs, title }) => {
  const [form, setForm] = useState({});



  const onSubmitHandler = (e)=>{
    e.preventDefault();
  // Remplir le champ createdBy  static pour le moment
    const formData = { ...form, createdBy: '65d8e9e5006ea987c7fdead8' };

    axios.post("http://localhost:3700/offers/addoffer", formData)
    .then(res=>{
      alert("ajout avec succeess")
      
      setForm({})
      window.location.replace("/Entreprise/offers");
    })
    .catch(err=>console.log(err.response.data))
    
  }

  // Fonction pour gérer les changements dans le formulaire
  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <NavbarEntreprise />
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="right">
            <form onSubmit={onSubmitHandler}>
                <div className="right">
                  <div className="w-1/2"><InputGroup
                    label="title"
                    type="text"
                    name="title"
                    onChangeHandler={onChangeHandler}

                  /></div>
                  
                 
                  <div className="w-1/2"><InputGroup
                    label="company"
                    type="text"
                    name="company"
                    onChangeHandler={onChangeHandler}

                  /></div>

                  <div className="  "> <InputGroup
                    label="location"
                    type="text"
                    name="location"
                    onChangeHandler={onChangeHandler}

                  /></div>
                 
                 <div className='flex flex-col'>
              <label className='text-gray-600 text-l mb-1'>
                Job Description
              </label>
              <InputGroup
                    label="description"
                    type="textarea"
                    name="description"
                    onChangeHandler={onChangeHandler}

                  />
             
             
            </div>
                 
                </div>

                <div className="left">

                  
                  <InputGroup
                    label="requirements"
                    type="text"
                    name="requirements"
                   value={form.requirements}
                   onChangeHandler={onChangeHandler}

                  />
                  <InputGroup
                    label="startDate"
                    type="Date"
                    name="startDate"
                    onChangeHandler={onChangeHandler}

                  />
                  <InputGroup
                    label="type"
                    type="select"
                    name="type"
                    onChangeHandler={onChangeHandler}

                  />
                   <InputGroup
                    label="Experience (ans)"
                    type="number"
                    name="experience"
                    onChangeHandler={onChangeHandler}

                  />
                  
                   
                  <div className="col-lg-4 col-md-6 footer-newsletter">
                    <button type="submit">Ajouter</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default AjouterOffer;
=======
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from '../../pages/Navbar';
import Footer from '../../pages/footer';

function AjouterOffer() {
  return (

    <>

    <Navbar/>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <Footer/>
    </>
  );
}

export default AjouterOffer;

