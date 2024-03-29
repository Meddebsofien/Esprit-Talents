import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NavbarEntreprise from "../frontoffice/pages/NavbarEntreprise.";
import Navbar from "../frontoffice/pages/Navbar";
import Footer from "../frontoffice/pages/footer";
import Swal from "sweetalert2";
const Twofa = () => {
  const [code, setCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setrole] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [qrImage, setQrImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const [header, payload, signature] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      setrole(decodedPayload.role);
    } else {
      console.log("Token non trouvé dans localStorage");
    }

    const fetchQrImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3700/users/qrImage/${id}`
        );
        const { image, success } = await response.json();

        if (success) {
          setQrImage(image);

          console.log("QR image:", image);
          console.log("Success:", success);
          console.log("code:", code);
        } else {
          console.error("Failed to fetch QR image.");
        }
      } catch (error) {
        console.error("Error fetching QR image:", error);
      }
    };

    fetchQrImage();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enable2fa = async () => {
      try {
        const response = await fetch(
          `http://localhost:3700/set2FA/${id}?code=${code}`
        );
        console.log("Response:", response);
        const { success } = await response.json();
        console.log("Success:", success);
        if (success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "2FA enabled successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error enabling 2FA. Please try again.!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      } catch (error) {
        console.error("Error enabling 2FA:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error enabling 2FA. Please try again.!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    };
    enable2fa();
  };

  return (
    <>
      <div>
        {" "}
        {role === "Student" && <Navbar />}
        {role === "Company" && <NavbarEntreprise />}
        {role === "Staff" && <Navbar />}
      </div>

      <ForgotPasswordContainer>
        <section id="hero">
          <div className="hero-container">
            <div className="hero-container">
              <ForgotPasswordBox>
                <h4>Enable 2FA</h4>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {qrImage ? (
                    <img src={qrImage} alt="QR Code" />
                  ) : (
                    <p>Loading QR image...</p>
                  )}
                </div>
                &nbsp;
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="2FA CODE"
                      name="code"
                      className="form-control"
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    style={{
                      backgroundColor: "rgba(31, 38, 135)",
                      border: "none",
                    }}
                  >
                    Send
                  </button>
                </form>
                {successMessage && (
                  <div className="success-message">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
              </ForgotPasswordBox>
            </div>
          </div>
        </section>
      </ForgotPasswordContainer>
      <Footer />
    </>
  );
};

const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #14163c;
`;

const ForgotPasswordBox = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  padding: 20px;
  width: 30vw;

  h4 {
    margin-bottom: 20px;
  }

  form {
    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
  }

  button {
    width: 100%;
  }

  .success-message,
  .error-message {
    margin-top: 20px;
  }

  @media only screen and (max-width: 768px) {
    width: 80vw;
  }
`;

export default Twofa;
