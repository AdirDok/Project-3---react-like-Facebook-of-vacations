import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// ==============================================

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function Loginn({ setLoginOrNot }) {

    const [msg, setMsg] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    // login stetes
    const [first_name, setFirst_name] = useState("")
    const [last_Name, setLast_Name] = useState("")
    const [Email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const navigate = useNavigate()

    const login = async () => {
        const res = await fetch(`http://localhost:1000/users/login`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ first_name, last_Name, Email, password }),
            credentials: 'include'

        })

        const data = await res.json()

        if (data.err) {
            alert(data.err)
        } else {
            localStorage.user = JSON.stringify(data.user)
            setLoginOrNot(up => !up)
            navigate('/feed')
        }
    }

    // ======================================================

    // register stetes
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [R_Email, setR_Email] = useState("")
    const [R_password, setR_password] = useState("")

    const register = async () => {
        const res = await fetch(`http://localhost:1000/users/register`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, R_Email, R_password }),
            credentials: 'include'
        })

        const data = await res.json()
        setIsOpen(!isOpen)

        if (data.err) {
            alert(data.err)
        }

        if (res.status == 200) {
            setMsg('Successfully registered Please login')
        }

    }


    return (

        <div className='login'>
            <video className='video' src="/video.mp4" muted loop autoPlay ></video>

            <div className="main-text">


                <h1>Vacations for you and me</h1>

                <div className="form">
                    <div className="dialog-divs">
                        <TextField className='login-divs' onChange={(e) => setFirst_name(e.target.value)} placeholder='first name' />
                        <TextField className='login-divs' onChange={(e) => setLast_Name(e.target.value)} placeholder='last name' />
                    </div>
                    <div className="dialog-divs">
                        <TextField className='login-divs' onChange={(e) => setEmail(e.target.value)} type={"Email"} placeholder='email' />
                        <TextField className='login-divs' onChange={(e) => setPassword(e.target.value)} type={"password"} placeholder='password' />
                    </div>


                    <Button onClick={login} variant="contained">login</Button>

                    <hr />
                    <div className="register">
                        <Button id='register-btn'  onClick={() => setIsOpen(!isOpen)}>Register now</Button>
                    </div>

                </div>
            </div>

            {/* ============================================================================ */}


            <Dialog open={isOpen} >

                <DialogTitle className='dialog-titel' >

                    Register</DialogTitle>

                <DialogContent>
                    <div className="form">
                        <div className="dialog-divs">
                            <TextField className='dialog-inp' onChange={(e) => setFirstName(e.target.value)} placeholder='first name' />
                            <TextField className='dialog-inp' onChange={(e) => setLastName(e.target.value)} placeholder='last name' />
                        </div>
                        <div className="dialog-divs">
                            <TextField className='dialog-titel' onChange={(e) => setR_Email(e.target.value)} type={"Email"} placeholder='email' />
                            <TextField className='dialog-titel' onChange={(e) => setR_password(e.target.value)} type={"password"} placeholder='password' />
                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpen(!isOpen)} >Cancel</Button>
                    <Button onClick={() => register()} >Register</Button>
                </DialogActions>
            </Dialog>
            <h1 className='main-text msg'  >{msg}</h1>
        </div>
    )
}
