const {httpError} = require('../helpers/handleErrors')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const { dirname } = require('path');

const {DBConnect} = require('../../config/mysql')

const reportes = express()

//DBConnect()


//     ********  Middleware  **********

reportes.use(bodyParser.json());
reportes.use(bodyParser.urlencoded({extended:true}));
reportes.use(express.static(path.join(__dirname, 'public')))

reportes.engine('html',require('ejs').renderFile);
reportes.set('view engine', 'ejs');

let fecha_hora = new Date();
const fecha = fecha_hora.getFullYear() + '-' + fecha_hora.getMonth() + '-' + fecha_hora.getDate()
const hora = fecha_hora.getHours() + ':' + fecha_hora.getMinutes() + ':' + fecha_hora.getSeconds()


const getReportes = (req, res) => {
    console.log(path.join(__dirname, 'views', 'report.html'))
    res.sendFile(path.join(__dirname, 'views', 'report.html'));
}



const postReportes = (req, res) => {
    const titulo = req.body.Nombre;
    const descripcion = req.body.descripcion;
    const tipo = req.body.tipo;
    /*query_id_usuario = connection.query('SELECT * FROM entrada ORDER BY id DESC', (error, results) =>{
        id_usuario = results[0].id_usuario;
        console.log(id_usuario)
    })*/
    console.log(descripcion)
    if (tipo == "sismo"){
        query_id_usuario = DBConnect.query('SELECT * FROM entrada ORDER BY id DESC', (error, results))
        id_usuario = results[0].id_usuario;
        console.log(id_usuario)
        DBConnect.query('INSERT INTO notificacion SET ?'), {
            id_suceso: 1,
            //id_usuario: ,
            fecha: fecha,
            hora: hora,
            titulo: titulo,
            descripcion: descripcion
        }
        res.render ('login.html' , {
            alert: true,
            alertTitle: "Sent",
            alertMessage: "Successful Welcome!",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'tizalerta/main'
        })
    }else if (tipo == "inundacion"){
        query_id_usuario = connection.query('SELECT * FROM entrada ORDER BY id DESC', (error, results))
        id_usuario = results[0].id_usuario;
        console.log(id_usuario)
        connection.query('INSERT INTO notificacion SET ?'), {
            id_suceso: 2,
            id_usuario: id_usuario,
            fecha: fecha,
            hora: hora,
            titulo: titulo,
            descripcion: descripcion
        }
        app.get("tizalerta/main")
    }

};




module.exports = {getReportes, postReportes}