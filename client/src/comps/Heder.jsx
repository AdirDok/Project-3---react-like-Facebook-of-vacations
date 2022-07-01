import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

// ============dialog===========
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function Heder({ setLoginOrNot, setUpdate }) {

  const user = JSON.parse(localStorage.user)
  const [isOpen, setIsOpen] = useState(false)

  // stets fore the inputs
  const [destination, setDestination] = useState("")
  const [description, setdescription] = useState("")
  const [img, setImg] = useState("")

  const [price, setPrice] = useState(1000)
  const [starts_at, setStarts_at] = useState("")
  const [ends_at, setEnds_at] = useState("")

  const logout = async () => {
    const res = await fetch(`http://localhost:1000/users/logout`, {
      method: "delete"
    })

    const data = await res.json()
    localStorage.removeItem("user")
    setLoginOrNot(up => !up)
  }

  const addVacation = async () => {
    const res = await fetch(`http://localhost:1000/feeds`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ destination, description, img, price, starts_at, ends_at }),
      credentials: 'include'
    })
    const data = await res.json()
    console.log(data)

    if (data.err) {
      alert(data.err)
    } else {
      setIsOpen(up => !up)
      setUpdate(up => !up)
    }

  }



  return (
    <div>
      <AppBar position="static">
        <Toolbar>

          <div className="user-name">
            <h3> Hi {user.first_name} </h3>
            <FlightTakeoffIcon />
          </div>

          <Typography className='bar' variant="h6" component="div" sx={{ flexGrow: 1 }}>

            {
              !user.admin ? "" :
                <div className="admin">
                  <Link className='linkim' to='/feed' >Feed  </Link>
                  <Link className='linkim' to='/about' >Chart  </Link>
                  <Button onClick={() => setIsOpen(!isOpen)} color={"success"} variant="contained">< AddCircleIcon fontSize='large' /></Button>

                </div>
            }

          </Typography>

          <button onClick={logout}>Logout</button>
        </Toolbar>
      </AppBar>
      {/* ========================================================================================= */}

      <Dialog
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle className='dialog-titel'    >
          Add a new vacation
        </DialogTitle>
        <DialogContent className='addVDialog'   >

          <div className="dialog-divs">
            <input className='dialog-inp' type="text" onChange={(e) => setDestination(e.target.value)} placeholder='Vacation location' />
            <input className='dialog-inp' type="text" onChange={(e) => setdescription(e.target.value)} placeholder='Description' />
          </div>

          <div className="dialog-divs">
            <input className='dialog-inp' type="text" onChange={(e) => setImg(e.target.value)} placeholder='img rsc' />
            <input className='dialog-inp' type="number" onChange={(e) => setPrice(e.target.value)} placeholder='price'
              defaultValue={1000}
            />
          </div>

          <div className="dialog-divs">
            <p>start at :</p>
            <input onChange={(e) => setStarts_at(e.target.value)} type="date" placeholder='' />
            <p>ends at :</p>
            <input onChange={(e) => setEnds_at(e.target.value)} type="date" placeholder=''
              min={starts_at}
            />

          </div>


        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsOpen(!isOpen)} > cansel</Button>
          <Button onClick={addVacation} > ADD</Button>
        </DialogActions>
      </Dialog>
    </div >
  )
}
