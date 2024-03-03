import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Hero from './frontoffice/pages/hero'
import Signup from './components/signup/sign-up'
import Signin from './components/signin/signin'
import { productInputs, userInputs } from "./backoffice/formSource";
import List from './backoffice/pages/list/List'
import Home from './backoffice/pages/home/Home'
import Single from './backoffice/pages/single/Single'
import New from './backoffice/pages/new/New'
import AjouterOffer from './frontoffice/layout/offer/AjouterOffer'
import { Link } from 'react-router-dom'
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const user = localStorage.getItem("token");
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
    }

  return (
    
     <div >
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
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
          <Route path="/" >
          <Route index  element={<Hero />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="Signin" element={<Signin />} />
            <Route path ="addOffer" element ={<AjouterOffer/>} />
           
          </Route>

          <Route path='*' element={<Hero />} />
        </Routes>
      </BrowserRouter>

    
      



    </div>
    
  )
}

export default App
