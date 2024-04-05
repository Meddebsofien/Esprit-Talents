import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
const TwoFALogin = () => {
  const [code, setCode] = useState("");
  const [id, setId] = useState("");
  const [role, setrole] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const [header, payload, signature] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      setId(decodedPayload.id);
      setrole(decodedPayload.role);
    } else {
      console.log("Token non trouvé dans localStorage");
    }
  }, []);

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
          //alert("2FA enabled successfully!");
          let timerInterval;
          Swal.fire({
            title: "Auto close alert!",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
          if (role === "Company") {
            navigate("/Entreprise");
          } else {
            navigate("/" + role);
          }
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
        alert("Error enabling 2FA. Please try again.");
      }
    };
    enable2fa();
  };

  return (
    <ForgotPasswordContainer>
      <div className="hero-container">
        <ForgotPasswordBox>
          <h4>Please enter your code 2FA</h4>
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
              style={{ backgroundColor: "rgba(31, 38, 135)", border: "none" }}
            >
              Send
            </button>
          </form>
        </ForgotPasswordBox>
      </div>
    </ForgotPasswordContainer>
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

export default TwoFALogin;
