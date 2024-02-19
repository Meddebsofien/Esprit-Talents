import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Hero from './frontoffice/pages/hero'
import Signup from './components/sign-up'

import Signin from './components/sign-in'
import Sidebar from './backoffice/components/Sidebar'
function App() {
  const [count, setCount] = useState(0)

  return (
    
     <div >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Signin/>} />
            <Route path="home" element={<Hero />} />
            <Route path="signup" element={<Signup />} />

            <Route path='admin' element={<div className='Appb'><div className='AppGlass'><Sidebar/></div></div>  } />
            

          </Route>
        </Routes>
      </BrowserRouter>

    
      



    </div>
    
  )
}

export default App
