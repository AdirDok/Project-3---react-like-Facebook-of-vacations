const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',   
    database: 'masima_3'     
})

con.connect(err => {
    if (err) {
        return console.log(err)
    }

    console.log("conected to mysql server");
})

const SQL = (q) => {
    return new Promise((resolve, reject) => {
        con.query(q, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}


module.exports = SQL