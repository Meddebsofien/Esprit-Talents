import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./frontoffice/pages/hero";
import Signup from "./components/signup/sign-up";
import Signin from "./components/signin/signin";
import { formOffer, userInputs } from "./backoffice/formSource";
import List from "./backoffice/pages/list/List";
import Home from "./backoffice/pages/home/Home";
import Single from "./backoffice/pages/single/Single";
import New from "./backoffice/pages/new/New";
import AjouterOffer from "./frontoffice/layout/offer/AjouterOffer";
import Signupggle from "./components/signup_withggle/Signupggle";
import ResetPassword from "./components/forgetpassword/reset-password";
import ForgetPasswordForm from "./components/forgetpassword/forget-password";

import HeroEntreprise from "./frontoffice/pages/heroEntreprise";
import Listofferscomponent from "./frontoffice/layout/offer/Listofferscomponent";
import ListOfferBack from "./backoffice/layout/offer/listOfferBack";
import UpdateOffer from "./frontoffice/layout/offer/updateOffer";
import DetailsOffer from "./frontoffice/layout/offer/detailOffer/detailsOffer";
import DetailsofferEnt from "./frontoffice/layout/offer/detailOffer/detailsofferEnt";
import DetailsofferStudent from "./frontoffice/layout/offer/detailOffer/detailsofferStudent";
import EmailVerify from "./components/signup/VerifyEmail";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const user = localStorage.getItem("token");
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin">
            <Route index element={<Home />} />

            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="offers" element={<ListOfferBack />} />
          </Route>
          <Route path="/Entreprise">
            <Route index element={<HeroEntreprise />} />
            <Route
              path="addOffer"
              element={<AjouterOffer inputs={formOffer} />}
            />
            <Route path="offers" element={<Listofferscomponent />} />
            <Route path="update/:id" element={<UpdateOffer />} />
            <Route path="detailsentr/:id" element={<DetailsofferEnt />} />
          </Route>
          <Route path="/">
            <Route index element={<Signin />} />
            <Route path="Signup" element={<Signup />} />

            <Route path="ggle" element={<Signupggle />} />
            <Route
              path="/resetpass/:id/:token"
              element={<ResetPassword />}
            ></Route>
            <Route path="forgetpass" element={<ForgetPasswordForm />} />
            <Route path="Signin" element={<Signin />} />
            <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          </Route>
          <Route path="/Student">
            <Route index element={<Hero />} />
            <Route path="detailstudent/:id" element={<DetailsofferStudent />} />
          </Route>

          <Route path="*" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
