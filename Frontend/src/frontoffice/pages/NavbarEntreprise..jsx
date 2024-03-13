import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const NavbarEntreprise = () => {
  useEffect(() => {
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };

    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all);
      if (selectEl) {
        if (all) {
          selectEl.forEach((e) => e.addEventListener(type, listener));
        } else {
          selectEl.addEventListener(type, listener);
        }
      }
    };

    const onscroll = (el, listener) => {
      el.addEventListener("scroll", listener);
    };

    const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      let navbarlinks = select("#navbar .scrollto", true);
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) return;
        let section = select(navbarlink.hash);
        if (!section) return;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          navbarlink.classList.add("active");
        } else {
          navbarlink.classList.remove("active");
        }
      });
    };

    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);

    const scrollto = (el) => {
      let header = select("#header");
      let offset = header.offsetHeight;

      if (!header.classList.contains("header-scrolled")) {
        offset -= 16;
      }

      let elementPos = select(el).offsetTop;
      window.scrollTo({
        top: elementPos - offset,
        behavior: "smooth",
      });
    };

    const headerScrolled = () => {
      let selectHeader = select("#header");
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };

    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);

    const toggleBacktotop = () => {
      let backtotop = select(".back-to-top");
      if (backtotop) {
        if (window.scrollY > 100) {
          backtotop.classList.add("active");
        } else {
          backtotop.classList.remove("active");
        }
      }
    };

    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);

    const mobileNavToggle = (e) => {
      let navbar = select("#navbar");
      navbar.classList.toggle("navbar-mobile");
      e.currentTarget.classList.toggle("bi-list");
      e.currentTarget.classList.toggle("bi-x");
    };

    on("click", ".mobile-nav-toggle", mobileNavToggle);

    const mobileNavDropdownsActivate = (e) => {
      let navbar = select("#navbar");
      if (navbar.classList.contains("navbar-mobile")) {
        e.preventDefault();
        e.currentTarget.nextElementSibling.classList.toggle("dropdown-active");
      }
    };

    on("click", ".navbar .dropdown > a", mobileNavDropdownsActivate, true);

    const scrollToElement = (e) => {
      if (select(e.currentTarget.hash)) {
        e.preventDefault();
        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(e.currentTarget.hash);
      }
    };

    on("click", ".scrollto", scrollToElement, true);

    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }

    return () => {
      // Clean up event listeners when the component unmounts
      window.removeEventListener("load", navbarlinksActive);
      window.removeEventListener("scroll", navbarlinksActive);
      window.removeEventListener("load", headerScrolled);
      window.removeEventListener("scroll", headerScrolled);
      window.removeEventListener("load", toggleBacktotop);
      window.removeEventListener("scroll", toggleBacktotop);
      document.querySelectorAll(".mobile-nav-toggle").forEach((toggle) => {
        toggle.removeEventListener("click", mobileNavToggle);
      });
      document.querySelectorAll(".navbar .dropdown > a").forEach((link) => {
        link.removeEventListener("click", mobileNavDropdownsActivate);
      });
      document.querySelectorAll(".scrollto").forEach((link) => {
        link.removeEventListener("click", scrollToElement);
      });
    };
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <header id="header" className="fixed-top bg-white">
      <div className="container d-flex  align-items-center justify-content-between">
        <Link href="home" className="w-25 h-10">
          <img
            src="/src/assets/img/logo.png"
            alt=""
            className="img-fluid"
            style={{ width: "150px", height: "50px" }}
          />
        </Link>

        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <Link
                className="nav-link scrollto active text-black"
                to={`/Entreprise`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className="nav-link scrollto text-black"
                href="#services"
                to={`/Entreprise/addOffer`}
              >
                Ajouter Offer
              </Link>
            </li>

            <li>
              <Link
                className="nav-link scrollto text-black"
                to={`/Entreprise/offers`}
              >
                Mes Offer
              </Link>
            </li>

            <li className="dropdown">
              <Link href="#">
                <span className="text-black">Profil</span>{" "}
                <i className="bi bi-chevron-down"></i>
              </Link>
              <ul>
                <li>
                  <Link href="#">Edit profil</Link>
                </li>

                <li>
                  <button onClick={handleLogout}>logOut</button>
                </li>
              </ul>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};

export default NavbarEntreprise;
