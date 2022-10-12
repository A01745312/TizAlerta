const mysql = require('mysql')

const DBConnect = () => {
    connection = mysql.createConnection({
        host: "localhost",
        database: 'tizalertap',
        password: '',
        user: 'root'
    });

    connection.connect((error) => {
        if (error) throw error;
        console.log("Connected to database " );
      });

}


module.exports = {DBConnect}

