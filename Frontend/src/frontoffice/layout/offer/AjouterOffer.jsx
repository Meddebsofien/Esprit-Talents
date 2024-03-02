import { useState } from "react";
import "../../../backoffice/pages/new/new.scss";
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
                  <InputGroup
                    label="title"
                    type="text"
                    name="title"
                    onChangeHandler={onChangeHandler}

                  />
                  <InputGroup
                    label="description"
                    type="text"
                    name="description"
                    onChangeHandler={onChangeHandler}

                  />
                  <InputGroup
                    label="company"
                    type="text"
                    name="company"
                    onChangeHandler={onChangeHandler}

                  />
                  <InputGroup
                    label="location"
                    type="text"
                    name="location"
                    onChangeHandler={onChangeHandler}

                  />
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
                    type="text"
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
