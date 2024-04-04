import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

//import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
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

  return (
    <>
      {" "}
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
            </p>{" "}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-sm">
              {moment(createdAt).fromNow()}
            </div>
          </div>
          <div className="flex justify-start pt-3 "></div>
        </div>
      </Link>
    </>
  );
};

export default Offer;
