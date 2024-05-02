import { useEffect, useState,useRef } from "react";
import Offer from "../layout/offer/Offer";
import axios from "axios";
import Search from "../layout/offer/searche";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import ChatBot from 'react-simple-chatbot';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaComments } from "react-icons/fa";

function Dashboard() {
  const [conversationStarted, setConversationStarted] = useState(false);

  const [offer, setOffer] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterExp, setFilterExp] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItemsexp, setCheckedItemsexp] = useState({});
  const [showChat, setShowChat] = useState(true); // State to manage chat visibility
  const chatRef = useRef(null); // Référence pour le composant ChatBot


  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    console.log(value);
    console.log(isChecked);
    if (isChecked) {
      setOffer(offer.filter((e) => e.type === value));
    }
    if (!isChecked) {
      setOffer(filterExp);
    }
    setCheckedItems({ ...checkedItems, [value]: isChecked });
  };
  const handleInputClick = (e) => {
    e.stopPropagation(); // Empêche la propagation de l'événement de clic
  };
  const handelexp = (e) => {
    const value2 = e.target.value;
    const ischeck = e.target.checked;
    console.log(value2);
    console.log(ischeck);
    console.log(value2[0], value2[2]);

    if (ischeck) {
      setOffer(
        offer.filter(
          (v) => v.experience <= value2[2] && v.experience >= value2[0]
        )
      );
    }

    if (!ischeck) {
      setOffer(filterExp);
    }
    setCheckedItemsexp({ ...checkedItemsexp, [value2]: ischeck });
  };

  useEffect(() => {
    const filter = async () => {};

    filter();
  }, [checkedItems, checkedItemsexp]);
  useEffect(() => {
    // Si le chat est visible, ajustez sa position en fonction de l'icône de discussion
    if (showChat && chatRef.current) {
      const chatIcon = document.querySelector(".chat-icon");
      const chatIconRect = chatIcon.getBoundingClientRect();
      const chatHeight = chatRef.current.offsetHeight;
      const chatWidth = chatRef.current.offsetWidth;

      chatRef.current.style.top = `${chatIconRect.top - chatHeight}px`;
      chatRef.current.style.left = `${chatIconRect.left - chatWidth}px`;
    }
  }, [showChat]);

  const jobTypes = ["Emploi", "Stage"];
  const experience = [
    { title: "Under 1 Year", value: "0-1" },
    { title: "1 -2 Year", value: "1-2" },
    { title: "2 -6 Year", value: "2-6" },
    { title: "Over 6 Years", value: "6-9 " },
  ];

  const filterExperience = async (e) => {
    console.log(e);
    console.log(e[0], e[1], e[2]);
    setOffer(offer.filter((v) => v.experience <= e[2] && v.experience >= e[0]));
  };

  /* find all offers */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3700/offers/getAllOffers"
        );
        setOffer(response.data);
        setFilterExp(response.data);
      } catch (error) {
        // Gérer les erreurs ici
        console.error(
          "Une erreur s'est produite lors de la récupération des offres :",
          error
        );
      }
    };

    fetchData();
  }, []); // Tableau de dépendances vide pour exécuter cet effet une seule fois après le montage initial
  const steps = [
    {
      id: "Greet",
      message: "Bonjour ! Je suis votre conseiller en ligne. Comment puis-je vous aider aujourd'hui ?",
      trigger: "Options",
    },
    {
      id: "Options",
      options: [
        { value: "recherche_emploi", label: "Recherche d'emploi", trigger: "RechercheEmploi" },
        { value: "réseautage", label: "Réseautage", trigger: "Réseautage" },
        { value: "aide_profil", label: "Aide au profil", trigger: "AideProfil" },
        { value: "autre", label: "Autre demande", trigger: "AutreDemande" }
      ]
    },
    {
      id: "RechercheEmploi",
      message: "Vous cherchez un nouvel emploi ? Super ! Comment puis-je vous aider dans votre recherche d'emploi ?",
      trigger: "OptionsRechercheEmploi"
    },
    {
      id: "OptionsRechercheEmploi",
      options: [
        { value: "recherche_offres", label: "Rechercher des offres d'emploi", trigger: "RechercheOffres" },
        { value: "alertes_emploi", label: "Configurer des alertes emploi", trigger: "AlertesEmploi" },
        { value: "conseils_cv", label: "Conseils pour CV", trigger: "ConseilsCV" },
        { value: "retour", label: "Retour", trigger: "Options" }
      ]
    },
    {
      id: "RechercheOffres",
      message: "Recherchons des offres d'emploi ! Quel type d'emploi recherchez-vous ?",
      trigger: "AttenteSaisieUtilisateur"
    },
    // Ajoutez d'autres étapes pour gérer les détails spécifiques de la recherche d'emploi.
    {
      id: "AlertesEmploi",
      message: "Vous avez configuré avec succès des alertes emploi. Vous recevrez des notifications pour les offres d'emploi pertinentes.",
      trigger: "FinConversation"
    },
    {
      id: "ConseilsCV",
      message: "Voici quelques conseils pour améliorer votre CV : ...",
      trigger: "FinConversation"
    },
    // Ajoutez d'autres étapes pour gérer le réseautage, l'aide au profil, etc.
    {
      id: "Réseautage",
      message: "Le réseautage est important pour la croissance de carrière. Comment puis-je vous aider dans le réseautage ?",
      trigger: "AttenteSaisieUtilisateur"
    },
    {
      id: "AideProfil",
      message: "Votre profil est votre identité professionnelle. De quoi avez-vous besoin d'aide dans votre profil ?",
      trigger: "AttenteSaisieUtilisateur"
    },
    {
      id: "AutreDemande",
      message: "Je suis là pour vous aider avec toute autre demande que vous pourriez avoir. S'il vous plaît, dites-moi comment je peux vous aider.",
      trigger: "AttenteSaisieUtilisateur"
    },
    {
      id: "AttenteSaisieUtilisateur",
      user: true,
      trigger: "ConfirmationSaisieUtilisateur"
    },
    {
      id: "ConfirmationSaisieUtilisateur",
      message: "Merci pour votre demande. Je vais vous aider avec ça.",
      trigger: "FinConversation"
    },
    {
      id: "FinConversation",
      message: "Si vous avez besoin d'une assistance supplémentaire, n'hésitez pas à demander. Bonne journée !",
      end: true
    }
  ];
  
  
  
  
  const toggleChat = () => {
    setShowChat(!showChat);
  };
  const toggleConversation = () => {
    setConversationStarted(!conversationStarted);
    setShowChat(!showChat); // Inverse la visibilité du chat
  };
  

  return (

    <main id="main">

<div className="chat-icon" onClick={toggleConversation}>
        <FaComments size={24} />
      </div>
      
      {/* ChatBot component */}
      {showChat && (
        <div
          ref={chatRef}
          className="custom-chatbot"
          style={{
            position: "fixed",
            zIndex: 9999,
            marginTop:'1%',
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <ChatBot
            steps={steps}
            handleInputClick={handleInputClick}
            toggleChat={toggleConversation} // Fonction pour masquer le chat
          />
        </div>
      )}


      {/* ======= Services Section ======= */}
      <section id="services" className="services">
        <Search
          title="Find Your Dream Job with Esprit Talents"
          type="home"
          handleClick={() => {}}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={jobLocation}
          setLocation={setJobLocation}
        />
        
        <div className="container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]">
          <div className="hidden md:flex flex-col w-1/6 h-fit bg-white shadow-sm">
            <p className="text-lg font-semibold text-slate-600">
              Filter Search
            </p>

            <div className="py-2">
              <div className="flex justify-between mb-3">
                <p className="flex items-center gap-2 font-semibold">
                  <BiBriefcaseAlt2 />
                  Job Type
                </p> 

                <button>
                  <MdOutlineKeyboardArrowDown />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {jobTypes.map((jtype, index) => (
                  <div key={index} className="flex gap-2 text-sm md:text-base ">
                    <input
                      type="checkbox"
                      value={jtype}
                      className="w-4 h-4"
                      checked={checkedItems[jtype] || false}
                      onChange={handleCheckboxChange}
                    />
                    <span>{jtype}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-2 mt-4">
              <div className="flex justify-between mb-3">
                <p className="flex items-center gap-2 font-semibold">
                  <BsStars />
                  Experience
                </p>

                <button>
                  <MdOutlineKeyboardArrowDown />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {experience.map((exp) => (
                  <div key={exp.title} className="flex gap-3">
                    <input
                      type="checkbox"
                      value={exp?.value}
                      className="w-4 h-4"
                      checked={checkedItemsexp[exp.value] || false}
                      onChange={handelexp}
                    />
                    <span>{exp.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-5/6 px-5 md:px-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base">
                Shwoing: <span className="font-semibold">1,902</span> Jobs
                Available
              </p>
            </div>

            <div className="w-full flex flex-wrap gap-4">
              {offer.map(
                ({
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
                  _id,
                }) => (
                  <Offer
                    title={title}
                    description={description}
                    company={company}
                    location={location}
                    type={type}
                    startDate={startDate}
                    requirements={requirements}
                    Id={_id}
                    experience={experience}
                    createdAt={createdAt}
                    createdBy={createdBy}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-title">
            <h2>F.A.Q</h2>
            <h3>
              Frequently Asked <span>Questions</span>
            </h3>
          </div>

          <ul className="faq-list">
            <li>
              <div
                data-bs-toggle="collapse"
                className="collapsed question"
                href="#faq1"
              >
                Non consectetur a erat nam at lectus urna duis?{" "}
                <i className="bi bi-chevron-down icon-show"></i>
                <i className="bi bi-chevron-up icon-close"></i>
              </div>
              <div id="faq1" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id
                  volutpat lacus laoreet non curabitur gravida. Venenatis lectus
                  magna fringilla urna porttitor rhoncus dolor purus non.
                </p>
              </div>
            </li>

            <li>
              <div
                data-bs-toggle="collapse"
                href="#faq2"
                className="collapsed question"
              >
                Feugiat scelerisque varius morbi enim nunc faucibus a
                pellentesque? <i className="bi bi-chevron-down icon-show"></i>
                <i className="bi bi-chevron-up icon-close"></i>
              </div>
              <div id="faq2" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Dolor sit amet consectetur adipiscing elit pellentesque
                  habitant morbi. Id interdum velit laoreet id donec ultrices.
                  Fringilla phasellus faucibus scelerisque eleifend donec
                  pretium. Est pellentesque elit ullamcorper dignissim. Mauris
                  ultrices eros in cursus turpis massa tincidunt dui.
                </p>
              </div>
            </li>

            <li>
              <div
                data-bs-toggle="collapse"
                href="#faq3"
                className="collapsed question"
              >
                Dolor sit amet consectetur adipiscing elit pellentesque habitant
                morbi? <i className="bi bi-chevron-down icon-show"></i>
                <i className="bi bi-chevron-up icon-close"></i>
              </div>
              <div id="faq3" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Eleifend mi in nulla posuere sollicitudin aliquam ultrices
                  sagittis orci. Faucibus pulvinar elementum integer enim. Sem
                  nulla pharetra diam sit amet nisl suscipit. Rutrum tellus
                  pellentesque eu tincidunt. Lectus urna duis convallis
                  convallis tellus. Urna molestie at elementum eu facilisis sed
                  odio morbi quis
                </p>
              </div>
            </li>

            <li>
              <div
                data-bs-toggle="collapse"
                href="#faq4"
                className="collapsed question"
              >
                Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?{" "}
                <i className="bi bi-chevron-down icon-show"></i>
                <i className="bi bi-chevron-up icon-close"></i>
              </div>
              <div id="faq4" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Dolor sit amet consectetur adipiscing elit pellentesque
                  habitant morbi. Id interdum velit laoreet id donec ultrices.
                  Fringilla phasellus faucibus scelerisque eleifend donec
                  pretium. Est pellentesque elit ullamcorper dignissim. Mauris
                  ultrices eros in cursus turpis massa tincidunt dui.
                </p>
              </div>
            </li>

            <li>
              <div
                data-bs-toggle="collapse"
                href="#faq5"
                className="collapsed question"
              >
                Tempus quam pellentesque nec nam aliquam sem et tortor
                consequat? <i className="bi bi-chevron-down icon-show"></i>
                <i className="bi bi-chevron-up icon-close"></i>
              </div>
              <div id="faq5" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Molestie a iaculis at erat pellentesque adipiscing commodo.
                  Dignissim suspendisse in est ante in. Nunc vel risus commodo
                  viverra maecenas accumsan. Sit amet nisl suscipit adipiscing
                  bibendum est. Purus gravida quis blandit turpis cursus in
                </p>
              </div>
            </li>

            <li>
              <div
                data-bs-toggle="collapse"
                href="#faq6"
                className="collapsed question"
              >
                Tortor vitae purus faucibus ornare. Varius vel pharetra vel
                turpis nunc eget lorem dolor?{" "}
                <i className="bi bi-chevron-down icon-show"></i>
                <i className="bi bi-chevron-up icon-close"></i>
              </div>
              <div id="faq6" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris
                  vitae ultricies leo integer malesuada nunc vel. Tincidunt eget
                  nullam non nisi est sit amet. Turpis nunc eget lorem dolor
                  sed. Ut venenatis tellus in metus vulputate eu scelerisque.
                  Pellentesque diam volutpat commodo sed egestas egestas
                  fringilla phasellus faucibus. Nibh tellus molestie nunc non
                  blandit massa enim nec.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section id="team" className="team">
        <div className="container">
          <div className="section-title">
            <h2>Team</h2>
            <h3>
              Our Hardworking <span>Team</span>
            </h3>
            <p>
              Ut possimus qui ut temporibus culpa velit eveniet modi omnis est
              adipisci expedita at voluptas atque vitae autem.
            </p>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
              <div className="member">
                <div className="member-img">
                  <img
                    src="/src/assets/img/team/team-1.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
                <div className="member-info">
                  <h4>Walter White</h4>
                  <span>Chief Executive Officer</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
              <div className="member">
                <div className="member-img">
                  <img
                    src="/src/assets/img/team/team-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
                <div className="member-info">
                  <h4>Sarah Jhonson</h4>
                  <span>Product Manager</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
              <div className="member">
                <div className="member-img">
                  <img
                    src="/src/assets/img/team/team-3.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
                <div className="member-info">
                  <h4>William Anderson</h4>
                  <span>CTO</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
              <div className="member">
                <div className="member-img">
                  <img
                    src="/src/assets/img/team/team-4.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
                <div className="member-info">
                  <h4>Amanda Jepson</h4>
                  <span>Accountant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-title">
            <h2>Contact</h2>
            <h3>
              <span>Contact Us</span>
            </h3>
            <p>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur
            </p>
          </div>

          <div className="row" data-aos="fade-in">
            <div className="col-lg-5 d-flex align-items-stretch">
              <div className="info">
                <div className="address">
                  <i className="bi bi-geo-alt"></i>
                  <h4>Location:</h4>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>

                <div className="email">
                  <i className="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <p>info@example.com</p>
                </div>

                <div className="phone">
                  <i className="bi bi-phone"></i>
                  <h4>Call:</h4>
                  <p>+1 5589 55488 55s</p>
                </div>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.598814006787!2d-73.94613138459698!3d40.719162479330334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25903ce155677%3A0xb53b41e1f154d175!2sA108%20Adam%20St%2C%20Brooklyn%2C%20NY%2011201%2C%20USA!5e0!3m2!1sen!2sro!4v1604269263552!5m2!1sen!2sro"
                  frameBorder="0"
                  style={{ border: "0", width: "100%", height: "290px" }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
              <form
                action="forms/contact.php"
                method="post"
                role="form"
                className="php-email-form"
              >
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="10"
                    required
                  ></textarea>
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Dashboard;
