import { useEffect, useState } from "react";
import "./details.css";
import Navbar from "../../pages/Navbar";
import Footer from "../../pages/footer";
import axios from "axios";
import InputGroup from "./inputGroup";
import NavbarEntreprise from "../../pages/NavbarEntreprise.";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AjouterOffer = ({ inputs, title }) => {
  const [idc, setIdc] = useState("");
  const [companyN, setCompanyN] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const [header, payload, signature] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      setIdc(decodedPayload.id);
      setCompanyN(decodedPayload.companyName);
    } else {
      console.log("Token non trouvé dans localStorage");
    }
  }, []);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Remplir le champ createdBy  static pour le moment
    const formData = { ...form, createdBy: idc, company: companyN };
    console.log(formData);
    axios
      .post("http://localhost:3700/offers/addoffer", formData)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "offer Ajouter Avec success",
          showConfirmButton: false,
          timer: 2000,
        });

        setForm({});
        navigate("/Entreprise/offers");
      })
      .catch((err) => console.log(err.response.data));
  };

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
                  <div>
                    <InputGroup
                      label="title"
                      type="text"
                      name="title"
                      onChangeHandler={onChangeHandler}
                    />
                  </div>

                  <div className="  ">
                    {" "}
                    <InputGroup
                      label="location"
                      type="text"
                      name="location"
                      onChangeHandler={onChangeHandler}
                    />
                  </div>

                  <div className="flex flex-col">
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
                    type="textarea"
                    name="requirements"
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
                  {/* <InputGroup
                    label="Experience (ans)"
                    type="number"
                    name="experience"
                    onChangeHandler={onChangeHandler}
                   
                  />*/}
                  &nbsp;
                  <input
                    type="number"
                    name="experience"
                    className="form-control"
                    placeholder="Experience (ans)"
                    onChange={onChangeHandler}
                    hidden={form.type === "Emploi" ? false : true}
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
};
export default AjouterOffer;
