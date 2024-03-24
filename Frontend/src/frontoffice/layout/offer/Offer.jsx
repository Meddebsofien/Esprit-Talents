import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import moment from "moment";
import "./details.css";

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
  return (
    <>
      {/*
     <Card style={{ width: '18rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Card.Img variant="top" src={imgSrc} />
        <Card.Body>
          <Card.Title><i className="bx bx-briefcase"></i> {title} </Card.Title>
          <Card.Title><i className="bx bx-map"></i>  {location} </Card.Title>
          <Card.Title><i className="bx bx-building"></i> {company} </Card.Title>
          <Card.Title>Type: <span>{type}</span> </Card.Title>
       
          <span >
            {moment(createdAt).fromNow()}
          </span>      <br />
          <Button className='button'>Apply</Button> &nbsp;
          <Button className='button' onClick={()=>onDetails(Id)}>Details</Button>
        </Card.Body>
      </Card>  
  */}
      <Link
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
            </p>
            <span className="text-gray-500 text-sm">
              {moment(createdAt).fromNow()}
            </span>
          </div>
          <div className="flex justify-start pt-3 "></div>
          <Button
            className="button bg-red-600  text-white w-20 h-10 hover:bg-gray-600 "
            onClick={handleModalShow} // Show modal on button click
          >
            Apply Now
          </Button>
        </div>
      </Link>
      {/* Modal for the application form */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please fill out this {type} application form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
  {/* Form fields */}
  {/* Use type variable to conditionally render form fields */}
  {type === 'Emploi' && (
    <>
      <Form.Group controlId="levelStudy">
        <Form.Label>Level Study</Form.Label>
        <Form.Control
          as="select"
          name="levelStudy"
          value={form.levelStudy}
          onChange={handleChange}
          isInvalid={!!errors.levelStudy}
        >
          <option value="">Select Level</option>
          <option value="Licence">Licence</option>
          <option value="Master">Master</option>
          <option value="Engineering">Engineering</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors.levelStudy}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="academicField">
        <Form.Label>Academic Field</Form.Label>
        <Form.Control
          as="select"
          name="academicField"
          value={form.academicField}
          onChange={handleChange}
          isInvalid={!!errors.academicField}
        >
          <option value="">Select Field</option>
          <option value="Business">Business</option>
          <option value="Data Science">Data Science</option>
          <option value="Development">Development</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid" style={{color: 'red'}}>{errors.academicField}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="experience">
        <Form.Label>Experience</Form.Label>
        <Form.Control
          as="select"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          isInvalid={!!errors.experience}
        >
          <option value="">Select Experience</option>
          <option value="Under year">Under year</option>
          <option value="1-2">1-2 years</option>
          <option value="2-6">2-6 years</option>
          <option value="Over 6">Over 6 years</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors.experience}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="cv">
        <Form.Label>Upload your CV PDF</Form.Label>
        <Form.Control
          type="file"
          name="cv"
          onChange={handleChange}
          isInvalid={!!errors.cv}
        />
        <Form.Control.Feedback type="invalid">{errors.cv}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="motivationLetter">
        <Form.Label>Upload your Motivation Letter PDF</Form.Label>
        <Form.Control
          type="file"
          name="motivationLetter"
          onChange={handleChange}
          isInvalid={!!errors.motivationLetter}
        />
        <Form.Control.Feedback type="invalid">{errors.motivationLetter}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="telephoneNumber">
        <Form.Label>Telephone Number</Form.Label>
        <Form.Control
          type="text"
          name="telephoneNumber"
          value={form.telephoneNumber}
          onChange={handleChange}
          isInvalid={!!errors.telephoneNumber}
        />
        <Form.Control.Feedback type="invalid">{errors.telephoneNumber}</Form.Control.Feedback>
      </Form.Group>
    </>
  )}
  {type === 'Stage' && (
    <>
      <Form.Group controlId="academicField">
        <Form.Label>Academic Field</Form.Label>
        <Form.Control
          as="select"
          name="academicField"
          value={form.academicField}
          onChange={handleChange}
          isInvalid={!!errors.academicField}
        >
          <option value="">Select Field</option>
          <option value="Business">Business</option>
          <option value="Data Science">Data Science</option>
          <option value="Development">Development</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors.academicField}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="internshipType">
        <Form.Label>Internship Type</Form.Label>
        <Form.Control
          as="select"
          name="internshipType"
          value={form.internshipType}
          onChange={handleChange}
          isInvalid={!!errors.internshipType}
        >
          <option value="">Select Type</option>
          <option value="PFE">PFE</option>
          <option value="Summer Internship">Summer Internship</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors.internshipType}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="internshipDuration">
        <Form.Label>Internship Duration</Form.Label>
        <Form.Control
          as="select"
          name="internshipDuration"
          value={form.internshipDuration}
          onChange={handleChange}
          isInvalid={!!errors.internshipDuration}
        >
          <option value="">Select Duration</option>
          <option value="1-2">1-2 months</option>
          <option value="3-6">3-6 months</option>
          <option value="Over 6">Over 6 months</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors.internshipDuration}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="telephoneNumber">
        <Form.Label>Telephone Number</Form.Label>
        <Form.Control
          type="text"
          name="telephoneNumber"
          value={form.telephoneNumber}
          onChange={handleChange}
          isInvalid={!!errors.telephoneNumber}
        />
        <Form.Control.Feedback type="invalid">{errors.telephoneNumber}</Form.Control.Feedback>
      </Form.Group>
    </>
  )}
  {/* Add other form fields here */}
</Form>

        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={handleSubmit}>
  Submit
</Button>
        <Button variant="secondary" onClick={handleModalClose}>
  Close
</Button>

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Offer;
