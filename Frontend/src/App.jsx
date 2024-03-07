import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./frontoffice/pages/hero";
import Signup from "./components/sign-up";
import Signin from "./components/sign-in";
import { userInputs, formOffer } from "./backoffice/formSource";
import List from "./backoffice/pages/list/List";
import Home from "./backoffice/pages/home/Home";
import Single from "./backoffice/pages/single/Single";
import New from "./backoffice/pages/new/New";
import AjouterOffer from "./frontoffice/layout/offer/AjouterOffer";
import SignUpPage from "./backoffice/pages/login/Login";
import Registre from "./backoffice/pages/login/registre";
import HeroEntreprise from "./frontoffice/pages/heroEntreprise";
import Listofferscomponent from "./frontoffice/layout/offer/Listofferscomponent";
import ListOfferBack from "./backoffice/layout/offer/listOfferBack";
import UpdateOffer from "./frontoffice/layout/offer/updateOffer";
import DetailsOffer from "./frontoffice/layout/offer/detailsOffer";
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

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
            <Route path="details/:id" element={<DetailsOffer />} />
          </Route>
          <Route path="/">
            <Route index element={<Signin />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="Signup2" element={<SignUpPage />} />

            <Route path="Signin" element={<Signin />} />
            <Route path="registre" element={<Registre />} />
          </Route>
          <Route path="/student">
            <Route index element={<Hero />} />
          </Route>

          <Route path="*" element={<Hero />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
