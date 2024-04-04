import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./frontoffice/pages/hero";
import Signup from "./components/signup/sign-up";
import Signin from "./components/signin/signin";

import  UpdateUser  from "./components/ProfileUser/UpdateUser";

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
import Twofa from "./components/twofa";
import TwoFALogin from "./components/TwoFALogin";
import HeroStaf from "./frontoffice/pages/HeroStaf";

import ListStaff from './backoffice/pages/list/ListStaff'
import ListStudent from './backoffice/pages/list/ListStudent'
import Company from "./backoffice/components/company/newCompany/newCompany";
import UpdateStaff from './backoffice/components/staff/updateStaff/updateStaff'
import NewStudent from './backoffice/components/student/newStudent/newStudent'
import UpdateStudent from './backoffice/components/student/updateStudent/updateStudent' ;
import Staff from './backoffice/components/staff/newStaff/Staff'
import CompanyUpdate from "./backoffice/components/company/updateCompany/updateCompany";

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
              <Route path="NewCompany" element={<Company  title="Add New Company" />}/>  
              <Route path="newStaff" element={<Staff  title="Add New Staff" />}/>   
              <Route path="newStudent" element={<NewStudent  title="Add New Student" />}/>   

     
              
              <Route path ="CompanyList"  element={<List />} />
              <Route path ="StaffList"  element={<ListStaff />} />
              <Route path ="StudentList"  element={<ListStudent />} />

              
            

              <Route path ="updateCompany/:userId" element ={<CompanyUpdate/>} />
              <Route path ="updateStaff/:userId" element ={<UpdateStaff/>} />
              <Route path ="updateStudent/:userId" element ={<UpdateStudent/>} />

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
            <Route path="twoFA/:id" element={<Twofa />} />

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
            <Route path="twoFALogin" element={<TwoFALogin />} />
          </Route>
          <Route path="/Student">
            <Route index element={<Hero />} />
            <Route path="twoFA/:id" element={<Twofa />} />

            <Route path="detailstudent/:id" element={<DetailsofferStudent />} />
          </Route>
          <Route path="/Staff">
            <Route index element={<HeroStaf />} />

            <Route path ="update/:userId" element ={<UpdateUser/>} />
          </Route>
         
         
          <Route path="*" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
