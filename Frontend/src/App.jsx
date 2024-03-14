import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Hero from './frontoffice/pages/hero'
import Entretien from './frontoffice/pages/Entretien'
import BEntretien from './backoffice/components/BEntretien/BEntretien'
import Signup from './components/sign-up'
import Signin from './components/sign-in'
import { productInputs, userInputs } from "./backoffice/formSource";
import List from './backoffice/pages/list/List'
import Home from './backoffice/pages/home/Home'
import Single from './backoffice/pages/single/Single'
import New from './backoffice/pages/new/New'
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

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
           
          </Route>

          <Route path='*' element={<Hero />} />
          <Route path='/entretien' element={<Entretien/>}/>
          <Route path='/admin/BEntretien' element={<BEntretien/>}/>
        </Routes>
      </BrowserRouter>

    
      



    </div>
    
  )
}

export default App
