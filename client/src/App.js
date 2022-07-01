import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loginn from './comps/Loginn'
import Main from './comps/Main'

export default function App() {

  const [loginOrNot, setLoginOrNot] = useState(false)

  useEffect(() => {

  }, [loginOrNot])



  return (

    <div>
      {
        localStorage.user ?
          <>
            <Main setLoginOrNot={setLoginOrNot} />
           
          </>
          :

          <>
            <Loginn setLoginOrNot={setLoginOrNot} />
          </>
      }
    </div>

  )
}
