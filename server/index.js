const express = require('express')
const session = require('express-session')
const cors = require('cors')

const app = express()
app.use(express.json())


app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}))


app.use(session({
    secret: "ItsGoingToBeLegendWaitForItDary",
    name: "session",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
 

app.use('/users', require('./routes/users'))
app.use('/feeds', require('./routes/feeds'))


app.listen(1000, console.log("server 1000 is online"))