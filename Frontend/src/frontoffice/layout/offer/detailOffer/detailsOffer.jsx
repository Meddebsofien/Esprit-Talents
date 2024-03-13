import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import "../details.css";
import Navbar from "../../../pages/Navbar";
import Footer from "../../../pages/footer";
const DetailsOffer = () => {
  const [data, setdata] = useState({});
  const { id } = useParams();
  const [selected, setSelected] = useState("0");
  const imgSrc =
    data.type === "Emploi"
      ? "/src/assets/img/job.jpg"
      : "/src/assets/img/stage.png";

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3700/offers/getOfferById/${id}`
        );
        setdata(response.data);
        console.log(response.data);
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
              <button className="button bg-black-400 text-white w-40">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsOffer;
