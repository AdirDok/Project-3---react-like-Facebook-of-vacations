const router = require('express').Router()
const SQL = require('../dbconfig')


router.post('/login', async (req, res) => {

    try {

        const { first_name, last_Name, Email, password } = req.body

        if (!first_name || !last_Name || !Email || !password) {
            return res.send({ err: 'somting is messing login' })
        }

        const [user] = await SQL(`
        SELECT id, first_name , last_Name , Email, admin FROM users
        WHERE first_name = "${first_name}" and password= "${password}"
        `)

        if (!user) {
            return res.send({ err: 'Username or password incorrect ' })
        }

        req.session.first_name = first_name
        req.session.admin = user.admin
        req.session.personid = user.id
        req.session.user = user

        res.send({ msg: 'successfully login', user})    
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})



router.post('/register', async (req, res) => {

    try {

        const { firstName, lastName, R_Email, R_password } = req.body

        const [name] = await SQL(`
        SELECT * FROM masima_3.users
        WHERE first_name = "${firstName}" 
        `)

        if (name) {
            return res.send({ err: 'Username already in taken' })
        }

        const [mail] = await SQL(`
        SELECT * FROM masima_3.users
        WHERE Email = "${R_Email}" 
        `)

        if (mail) {
            return res.send({ err: 'this email is already in the system' })
        }

        await SQL(`
        INSERT INTO users (first_name,last_Name,Email,password)
        VALUES("${firstName}","${lastName}","${R_Email}","${R_password}")
        `)

        res.send({ msg: "user add Welcome " + firstName })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})


router.delete('/logout', async (req, res) => {     
    req.session.destroy()
    res.send({ msg: 'bye love' })
})


module.exports = router