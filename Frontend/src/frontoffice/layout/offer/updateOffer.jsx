import React, { useState, useEffect } from "react";
import "../../../backoffice/pages/new/new.scss";
import Footer from "../../pages/footer";
import axios from "axios";
import InputGroup from "./inputGroup";
import NavbarEntreprise from "../../pages/NavbarEntreprise.";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const UpdateOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [offerData, setOfferData] = useState({}); // Pour stocker les données de l'offre
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    requirements: "",
    startDate: "",
    type: "",
    experience: "",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3700/offers/getOfferById/${id}`
        );
        // Stocker les données de l'offre dans le state
        setOfferData(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'offre :",
          error
        );
      }
    };

    fetchData();
  }, [id]); // Ajouter id dans le tableau de dépendances pour refetch les données lorsque id change

  // Fonction pour mettre à jour le formulaire avec les données de l'offre
  useEffect(() => {
    setForm({
      title: offerData.title || "",
      description: offerData.description || "",
      company: offerData.company || "",
      location: offerData.location || "",
      requirements: offerData.requirements || "",
      startDate: formatDate(offerData.startDate) || "",
      type: offerData.type || "",
      experience: offerData.experience || "",
    });
  }, [offerData]);

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .put(`http://localhost:3700/offers/updateOffer/${id}`, form)
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Offer updated successfully",
            showConfirmButton: false,
            timer: 2000,
          });

          navigate("/Entreprise/offers");
        });

      // Rediriger l'utilisateur ou afficher un message de succès si nécessaire
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'offre :", error);
    }
  };

  return (
    <>
      <NavbarEntreprise />
      <div className="new">
        <div className="newContainer ">
          <div className="bottom">
            <div className="right">
              <form onSubmit={onUpdate}>
                <div className="right">
                  <InputGroup
                    label="title"
                    type="text"
                    name="title"
                    value={form.title}
                    onChangeHandler={onChangeHandler}
                  />

                  <InputGroup
                    label="location"
                    type="text"
                    name="location"
                    value={form.location}
                    onChangeHandler={onChangeHandler}
                  />

                  <InputGroup
                    label="description"
                    type="textarea"
                    name="description"
                    value={form.description}
                    onChangeHandler={onChangeHandler}
                  />
                </div>
                <div className="left">
                  <InputGroup
                    label="requirements"
                    type="textarea"
                    name="requirements"
                    value={form.requirements}
                    onChangeHandler={onChangeHandler}
                  />
                  <InputGroup
                    label="startDate"
                    type="Date"
                    name="startDate"
                    value={form.startDate}
                    onChangeHandler={onChangeHandler}
                  />
                  <InputGroup
                    label="type"
                    type="select"
                    name="type"
                    value={form.type}
                    onChangeHandler={onChangeHandler}
                  />
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
                    <button type="submit">Modifier</button>
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

export default UpdateOffer;
