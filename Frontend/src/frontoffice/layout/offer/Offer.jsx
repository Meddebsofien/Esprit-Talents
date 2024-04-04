import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";

const Offer = ({
  title,
  description,
  company,
  location,
  type,
  startDate,
  requirements,
  experience,
  createdAt,
  createdBy,
  Id,
}) => {
  const navigate = useNavigate();
  const imgSrc =
    type === "Emploi" ? "/src/assets/img/job.jpg" : "/src/assets/img/stage.png";
  const onDetails = (id) => {
    navigate("/Entreprise/details/" + id);
  };
  const [errors, setErrors] = useState({});
  const [form, setFormEmploi] = useState({
    levelStudy: "",
    academicField: "",
    experience: "",
    cvUpload: null,
    motivationLetterUpload: null,
    telephoneNumber: "",
    typeCandidature: "Job",
    idOffer: Id,
    idUser: "660d553722822d69f4ee12bc",
  });
  const [formInternship, setFormInternship] = useState({
    academicField: "",
    telephoneNumber: "",
    internshipType: "",
    cvUpload: null,
    motivationLetterUpload: null,

    typeCandidature: "Intership",
    internshipDuration: "",
    idOffer: Id,
    idUser: "65fa7b9d0a3152ef593ade49",
  });
  const [showModal, setShowModal] = useState(false);

  const handleSubmitJob = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!form.levelStudy) {
      errors.levelStudy = "Level Study is required";
    }
    if (!form.academicField) {
      errors.academicField = "Academic Field is required";
    }
    if (!form.experience) {
      errors.experience = "Experience is required";
    }
        if (!form.cvUpload) {
      errors.cvUpload = "CV PDF is required";
    }
    if (!form.motivationLetterUpload) {
      errors.motivationLetterUpload = "Motivation Letter PDF is required";
    } 
    if (!form.telephoneNumber) {
      errors.telephoneNumber = "Telephone Number is required";
    } else if (form.telephoneNumber.length !== 8) {
      errors.telephoneNumber = "Telephone Number must be  8 characters";
    }
    setErrors(errors);
    const formData = new FormData();
    formData.append("levelStudy", form.levelStudy);
    formData.append("academicField", form.academicField);
    formData.append("experience", form.experience);
    formData.append("cv", form.cvUpload);
    formData.append("motivationLetter", form.motivationLetterUpload);
    formData.append("telephoneNumber", form.telephoneNumber);
    formData.append("typeCandidature", "Job");
    formData.append("idOffer", Id);
    formData.append("idUser", "65fa7b9d0a3152ef593ade49");
    console.log(formData);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3700/candidatures/addCandidature",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );          
        setShowModal(false);

        
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setFormEmploi({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangeIntern = (e) => {
    setFormInternship({ ...formInternship, [e.target.name]: e.target.value });
  };

  const handleChangeDoc = (e) => {
    setFormEmploi({
      ...form,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleChangeDocEmploi = (e) => {
    setFormInternship({
      ...formInternship,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const handleSubmitInternship = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formInternship.academicField) {
      errors.academicField = "Academic Field is required";
    }
    if (!formInternship.internshipType) {
      errors.internshipType = "Internship Type is required";
    }

    if (!formInternship.internshipDuration) {
      errors.internshipDuration = "Internship Duration is required";
    }
    if (!formInternship.telephoneNumber) {
      errors.telephoneNumber = "Telephone Number is required";
    } else if (formInternship.telephoneNumber.length !== 8) {
      errors.telephoneNumber = "Telephone Number must be  8 charcters";
    }
    if (!formInternship.cvUpload) {
      errors.cvUpload = "CV PDF is required";
    }
    if (!formInternship.motivationLetterUpload) {
      errors.motivationLetterUpload = "Motivation Letter PDF is required";
    } 
    setErrors(errors);
    const formDataIn = new FormData();
    formDataIn.append("cv", formInternship.cvUpload);
    formDataIn.append("motivationLetter", formInternship.motivationLetterUpload);
    formDataIn.append("typeCandidature", "Intership");
    formDataIn.append("idOffer", Id);
    formDataIn.append("idUser", "65fa7b9d0a3152ef593ade49");
    formDataIn.append("academicField", formInternship.academicField);
    formDataIn.append("internshipDuration", formInternship.internshipDuration);
    formDataIn.append("telephoneNumber", formInternship.telephoneNumber);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3700/candidatures/addCandidature",
          formDataIn,{
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );

        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {" "}
      <div
        className="bg-white hover:bg-gray-500  text-black"
        to={`detailstudent/${Id}`}
      >
        <div
          className="w-full md:w-[16rem] 2xl:w-[18rem] h-[14rem] md:h-[14rem] bg-white flex flex-col justify-between shadow-lg 
                rounded-md px-3 py-5 "
          key={Id}
        >
          <div className="flex gap-3">
            <img src={imgSrc} className="w-14 h-14" />

            <div className="">
              <p className="text-lg font-semibold truncate">{title}</p>
              <span className="flex gap-2 items-center">
                <GoLocation className="text-slate-900 text-sm" />
                {location}
              </span>
            </div>
          </div>
          <div className="py-3">
            <p className="text-sm truncate">{description}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm">
              {type}
            </p>{" "}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-sm">
              {moment(createdAt).fromNow()}
            </div>

            <Button variant="contained" onClick={handleModalShow} size="small">
              Apply Now
            </Button>
          </div>
          <div className="flex justify-start pt-3 "></div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Form
          onSubmit={
            type === "Emploi" ? handleSubmitJob : handleSubmitInternship
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <Typography color="primary" variant="h5" gutterBottom>
                Please fill out this {type} application form
              </Typography>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {type === "Emploi" && (
              <>
                <Form.Group controlId="levelStudy">
                  <Form.Label>Level Study</Form.Label>
                  <Form.Control
                    as="select"
                    name="levelStudy"
                    value={form.levelStudy}
                    isInvalid={!!errors.levelStudy}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="Licence">Licence</option>
                    <option value="Master">Master</option>
                    <option value="engineering">Engineering</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.levelStudy}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="academicField">
                  <Form.Label>Academic Field</Form.Label>
                  <Form.Control
                    as="select"
                    name="academicField"
                    value={form.academicField}
                    onChange={handleChange}
                    isInvalid={!!errors.academicField}
                    required
                  >
                    <option value="">Select Field</option>
                    <option value="Business">Business</option>
                    <option value="Computer Science">Computer Science</option>
                  </Form.Control>
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ color: "red" }}
                  >
                    {errors.academicField}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="experience">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    as="select"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    isInvalid={!!errors.experience}
                    required
                  >
                    <option value="">Select Experience</option>
                    <option value="Under year">Under year</option>
                    <option value="1-2">1-2 years</option>
                    <option value="2-6">2-6 years</option>
                    <option value="Over 6">Over 6 years</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.experience}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="cv">
                  <Form.Label>Upload your CV PDF</Form.Label>
                  <input
                    type="file"
                    name="cvUpload"
                    onChange={handleChangeDoc}
                    isInvalid={!!errors.cv}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cv}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="motivationLetter">
                  <Form.Label>Upload your Motivation Letter PDF</Form.Label>
                  <Form.Control
                    type="file"
                    name="motivationLetterUpload"
                    onChange={handleChangeDoc}
                    isInvalid={!!errors.motivationLetter}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.motivationLetter}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="telephoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="telephoneNumber"
                    value={form.telephoneNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.telephoneNumber}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.telephoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </>
            )}
            {type === "Stage" && (
              <>
                <Form.Group controlId="academicField">
                  <Form.Label>Academic Field</Form.Label>
                  <Form.Control
                    as="select"
                    name="academicField"
                    value={formInternship.academicField}
                    onChange={handleChangeIntern}
                    isInvalid={!!errors.academicField}
                    required
                  >
                    <option value="">Select Field</option>
                    <option value="Business">Business</option>
                    <option value="Computer Science">Computer Science</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.academicField}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="internshipType">
                  <Form.Label>Internship Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="internshipType"
                    value={formInternship.internshipType}
                    onChange={handleChangeIntern}
                    isInvalid={!!errors.internshipType}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="PFE">PFE</option>
                    <option value="Summer Internship">Summer Internship</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.internshipType}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="internshipDuration">
                  <Form.Label>Internship Duration</Form.Label>
                  <Form.Control
                    as="select"
                    name="internshipDuration"
                    value={formInternship.internshipDuration}
                    onChange={handleChangeIntern}
                    isInvalid={!!errors.internshipDuration}
                    required
                  >
                    <option value="">Select Duration</option>
                    <option value="1-2">1-2 months</option>
                    <option value="3-6">3-6 months</option>
                    <option value="Over 6">Over 6 months</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.internshipDuration}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="telephoneNumber">
                  <Form.Label>Telephone Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="telephoneNumber"
                    value={formInternship.telephoneNumber}
                    onChange={handleChangeIntern}
                    isInvalid={!!errors.telephoneNumber}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.telephoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
                
               
                <Form.Group controlId="cv">
                  <Form.Label>Upload your CV PDF</Form.Label>
                  <input
                    type="file"
                    name="cvUpload"
                    onChange={handleChangeDocEmploi}
                    isInvalid={!!errors.cv}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cv}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="motivationLetter">
                  <Form.Label>Upload your Motivation Letter PDF</Form.Label>
                  <Form.Control
                    type="file"
                    name="motivationLetterUpload"
                    onChange={handleChangeDocEmploi}
                    isInvalid={!!errors.motivationLetter}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.motivationLetter}
                  </Form.Control.Feedback>
                </Form.Group>
              </>
            )}
            {/* Add other form fields here */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              onClick={
                type === "Emploi" ? handleSubmitJob : handleSubmitInternship
              }
            >
              Submit
            </Button>{" "}
            &nbsp;
            <Button variant="outlined" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Offer;
