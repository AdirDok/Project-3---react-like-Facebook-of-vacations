import React, { useState } from 'react'

import { BrowserRouter, Route, Routes, useNavigate, useNavigationType } from 'react-router-dom'
import About from './About'
import Feed from './Feed'
import Heder from './Heder'

export default function Main({ setLoginOrNot }) {

  const [update, setUpdate] = useState(false)

  // navigate = useNavigate()
  const user = JSON.parse(localStorage.user)
  return (
    

      <div>
        <Heder setLoginOrNot={setLoginOrNot} setUpdate={setUpdate} />

        <Routes>


          {
            user.admin == true ?
              <>
              
                <Route path='/about' element={<About />} />
                <Route path='/feed' element={<Feed update={update} setUpdate={setUpdate} />} />

              </>

              :

              <>
                <Route path='/feed' element={<Feed update={update} setUpdate={setUpdate} />} />
              </>
          }


        </Routes>

      </div>
  
  )
}
