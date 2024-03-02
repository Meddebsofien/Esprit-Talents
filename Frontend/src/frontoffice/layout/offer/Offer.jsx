import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../../../App.css";
import { Link } from 'react-router-dom';
import { GoLocation } from "react-icons/go";
import moment from 'moment';

const Offer = ({ title, description, company, location, type, startDate, requirements, experience,createdAt,createdBy, Id }) => {

  const imgSrc = type === 'Emploi' ? '/src/assets/img/job.jpg' : '/src/assets/img/stage.png';

  return (
    <>
     <Card style={{ width: '18rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Card.Img variant="top" src={imgSrc} />
        <Card.Body>
          <Card.Title><i className="bx bx-briefcase"></i> {title} </Card.Title>
          <Card.Title><i className="bx bx-map"></i>  {location} </Card.Title>
          <Card.Title><i className="bx bx-building"></i> {company} </Card.Title>
          <Card.Title>Type: <span>{type}</span> </Card.Title>
          <Card.Title>Experience: {experience} ans</Card.Title>
          <span >
            {moment(createdAt).fromNow()}
          </span>      <br />
          <Button className='button'>Apply</Button> &nbsp;
          <Button className='button'>Details</Button>
        </Card.Body>
      </Card>  

      
     
    </>
  )
}

export default Offer;
