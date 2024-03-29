import React from "react";
import NavbarStaff from "./NavbarStaff";
import Dashboard from "./Dashbord";
import Footer from "./footer";

const HeroStaf = () => {
  return (
    <>
      <NavbarStaff />
      <section id="hero">
        <div className="hero-container">
          <h3>
            Welcome to <strong>Tempo</strong>
          </h3>
          <h1>We're Creative Agency</h1>
          <h2>
            We are team of talented designers making websites with Bootstrap
          </h2>
          <a href="#about" className="btn-get-started scrollto">
            Get Started
          </a>
        </div>
      </section>
      <Dashboard />
      <Footer />
    </>
  );
};

export default HeroStaf;
