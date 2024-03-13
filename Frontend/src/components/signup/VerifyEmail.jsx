import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./sign-up.scss";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:3700/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        // setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
      <div className="containeraa">
        <img src="/src/assets/img/succes.jpg" />
        <h1>Email verified successfully</h1>
        <Link to="/Signin">
          <button className="green_btnaa">Login</button>
        </Link>
      </div>
    </>
  );
};

export default EmailVerify;
