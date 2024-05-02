import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import "../details.css";
import Navbar from "../../../pages/Navbar";
import Footer from "../../../pages/footer";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailsOffer = () => {

  const [pdfUrl,setPdfUrl] = useState(null);
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [actuelOffer, setActuelOffer] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setFormEmploi] = useState({
    cvUpload: null,
    motivationLetterUpload: null,
    typeCandidature: "Job",
    idOffer: actuelOffer,
    idUser: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleSubmitJob = async (e) => {
    e.preventDefault();

    const errors = {};
   
    if (!form.cvUpload) {
      errors.cvUpload = "CV PDF is required";
    }
    if (!form.motivationLetterUpload) {
      errors.motivationLetterUpload = "Motivation Letter PDF is required";
    }
    
    setErrors(errors);
    const formData = new FormData();
    formData.append("cv", form.cvUpload);
    formData.append("motivationLetter", form.motivationLetterUpload);
    formData.append("idOffer", actuelOffer);
    formData.append("idUser", idAct);
    console.log(formData);

    if (Object.keys(errors).length != 0) {

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'd7tvdr8o');
      var fileUrl = '';
  
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/ddbmnd09o/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
  
        console.log('File uploaded:', response.data);
        fileUrl = response.data.secure_url;
        //setPdfUrl(fileUrl)
        console.log('File URL:', fileUrl);
        
      } catch (error) {
        console.error('Upload failed:', error);
      }
     
      try {
        
        const response = await axios
          .post("http://localhost:3700/candidatures/addCandidacy", {
            pdfUrl: fileUrl,
            actuelOffer: actuelOffer,
            idAct: idAct,
          })
          .then(()=>{
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Candidacy Added successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          });
        
        navigate("/Student");
      } catch (error) {
         console.log("error post : ",error);
      }
    }
    console.log("pdfuRL : ",pdfUrl)
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile); 
  };

  const handleChange = (e) => {
    setFormEmploi({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  // const handleSubmitInternship = async (e) => {
  //   e.preventDefault();

  //   const errors = {};

  //   if (!formInternship.academicField) {
  //     errors.academicField = "Academic Field is required";
  //   }
  //   if (!formInternship.internshipType) {
  //     errors.internshipType = "Internship Type is required";
  //   }

  //   if (!formInternship.internshipDuration) {
  //     errors.internshipDuration = "Internship Duration is required";
  //   }
  //   if (!formInternship.telephoneNumber) {
  //     errors.telephoneNumber = "Telephone Number is required";
  //   } else if (formInternship.telephoneNumber.length !== 8) {
  //     errors.telephoneNumber = "Telephone Number must be  8 charcters";
  //   }
  //   if (!formInternship.cvUpload) {
  //     errors.cvUpload = "CV PDF is required";
  //   }
  //   if (!formInternship.motivationLetterUpload) {
  //     errors.motivationLetterUpload = "Motivation Letter PDF is required";
  //   }
  //   setErrors(errors);
  //   const formDataIn = new FormData();
  //   formDataIn.append("cv", formInternship.cvUpload);
  //   formDataIn.append(
  //     "motivationLetter",
  //     formInternship.motivationLetterUpload
  //   );
  //   formDataIn.append("typeCandidature", "Intership");
  //   formDataIn.append("idOffer", actuelOffer);
  //   formDataIn.append("idUser", idAct);
  //   formDataIn.append("academicField", formInternship.academicField);
  //   formDataIn.append("internshipDuration", formInternship.internshipDuration);
  //   formDataIn.append("telephoneNumber", formInternship.telephoneNumber);

  //   if (Object.keys(errors).length === 0) {
  //     try {
  //       const response = await axios
  //         .post("http://localhost:3700/candidatures/addCandidature", formDataIn)
  //         .then(() => {
  //           Swal.fire({
  //             position: "top-end",
  //             icon: "success",
  //             title: "candidature Ajouter Avec success",
  //             showConfirmButton: false,
  //             timer: 2000,
  //           });
  //           navigate("/Student");
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const [data, setdata] = useState({});

  const [selected, setSelected] = useState("0");
  const imgSrc =
    data.type === "Emploi"
      ? "/src/assets/img/job.jpg"
      : "/src/assets/img/stage.png";

  const [idAct, setidAct] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3700/offers/getOfferById/${id}`
        );
        setdata(response.data);
        console.log(id);
        setActuelOffer(id);
        console.log(response.data);
        const token = localStorage.getItem("token");

        if (token) {
          const [header, payload, signature] = token.split(".");
          const decodedPayload = JSON.parse(atob(payload));
          console.log("id user " + decodedPayload.id);

          setidAct(decodedPayload.id);
        } else {
          console.log("Token non trouvé dans localStorage");
        }

        console.log(idAct);
      } catch (err) {
        console.log(err);
      }
    };

    fetchdata();
  }, [id]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="container mx-auto pt-5 pb-5">
        <div className="w-full flex flex-col md:flex-row gap-10">
          {/* LEFT SIDE */}
          <div className="w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md">
            <div className="w-full flex items-center justify-between">
              <div className="w-3/4 flex gap-2">
                <img
                  src={imgSrc}
                  alt=""
                  className="w-20 h-20 md:w-24 md:h-20 rounded"
                />

                <div className="flex flex-col">
                  <p className="text-xl font-semibold text-gray-600">
                    {data.title}
                  </p>

                  <span className="text-base">{data.location}</span>

                  <span className="text-base text-blue-600">
                    {data.company}
                  </span>

                  <span className="text-gray-500 text-sm">
                    {moment(data?.createdAt).fromNow()}
                  </span>
                </div>
              </div>

              <div className="">
                <AiOutlineSafetyCertificate className="text-3xl text-blue-500" />
              </div>
            </div>

            <div className="w-full flex flex-wrap md:flex-row gap-2 items-center justify-arround my-10">
              <div className="bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center">
                <span className="text-sm">Job Type</span>
                <p className="text-l font-semibold text-gray-700">
                  {data.type}
                </p>
              </div>

              <div className="bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center">
                <span className="text-sm">Start Date</span>
                <p className="text-l font-semibold text-gray-700">
                  {formatDate(data.startDate)}
                </p>
              </div>

              {data.type === "Emploi" && (
                <div className="bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-sm">Experience</span>
                  <p className="text-l font-semibold text-gray-700">
                    {data.experience + "ans"}
                  </p>
                </div>
              )}
            </div>

            <div className="my-6">
              {selected === "0" ? (
                <>
                  <p className="text-xl font-semibold">Job Decsription</p>

                  <span className="text-base">{data.description}</span>

                  <p className="text-xl font-semibold">Requirement</p>

                  <span className="text-base">{data.requirements}</span>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="w-full">
              <button
                className="button bg-black-400 text-white w-40"
                onClick={handleModalShow}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Form
          onSubmit={
            // data.type === "Emploi" ? handleSubmitJob : handleSubmitInternship
            handleSubmitJob

          }
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <Typography
                color=""
                className="text-red-400"
                variant="h5"
                gutterBottom
              >
                Please fill out this {data.type} application form
              </Typography>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
              <>
                <Form.Group controlId="cv">
                  <Form.Label>Upload your CV PDF</Form.Label>
                  <input
                    type="file"
                    name="cvUpload"
                    onChange={handleFileInputChange}
                    // isInvalid={!!errors.cv}
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
                    // isInvalid={!!errors.motivationLetter}
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.motivationLetter}
                  </Form.Control.Feedback>
                </Form.Group>
                
              </>
              <ToastContainer />
            {/* {data.type === "Stage" && (
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
            )} */}
            {/* Add other form fields here */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              onClick={
                // data.type === "Emploi"
                  // ? handleSubmitJob
                  // : handleSubmitInternship
                  handleSubmitJob
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

export default DetailsOffer;
