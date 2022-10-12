const mysql = require('mysql')
const { createPool } = require('mysql2/promise')

const DBConnect = mysql.createPool({   
        host: "localhost",
        database: 'tizalertap',
        password: '',
        user: 'root'
    })

console.log('CONEXIÓN DATABASE')

DBConnect.query('SELECT * FROM usuario', (err, results) => {
    console.log(' ***** Primer registro desde archivo  "mysql.js" *****\n', results[0], '\n Termina archivo mysql.js \n' )
})

module.exports = {DBConnect}

