import React, { useEffect } from "react";
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

  const [role, setrole] = React.useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const [header, payload, signature] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      const r = decodedPayload.role;

      if (r === "Company") {
        setrole("detailsentr");
      }
      if (r === "Student") {
        setrole("detailstudent");
      }
      if (r === "Staff") {
        setrole("detailStaff");
      }
    } else {
      console.log("Token non trouvé dans localStorage");
    }
  }, []);

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

        to={`${role}/${Id}`}

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
        </div>
      </Link>
    </>
  );
};

export default Offer;
