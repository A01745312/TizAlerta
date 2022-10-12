const mysql = require('mysql')
const { createPool } = require('mysql2')

const DBConnect = createPool({   
        host: "localhost",
        database: 'tizalertap',
        password: '',
        user: 'root'
    })

console.log('CONEXIÓN DATABASE')

matriculas = DBConnect.query('SELECT matricula FROM usuario')
console.log(matriculas)

module.exports = {DBConnect}

