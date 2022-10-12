const mysql = require('mysql')
const { createPool } = require('mysql2/promise')

const DBConnect = createPool({   
        host: "localhost",
        database: 'tizalertap',
        password: '',
        user: 'root'
    })

console.log('CONEXIÓN DATABASE')

module.exports = {DBConnect}

