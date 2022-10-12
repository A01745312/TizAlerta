const {httpError} = require('../helpers/handleErrors')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const { dirname } = require('path');

const {DBConnect} = require('../../config/mysql')

const login = express()

//DBConnect()


//     ********  Middleware  **********

login.use(bodyParser.json());
login.use(bodyParser.urlencoded({extended:true}));
login.use(express.static(path.join(__dirname, 'public')))

login.engine('html',require('ejs').renderFile);
login.set('view engine', 'ejs');

let fecha_hora = new Date();
const fecha = fecha_hora.getFullYear() + '-' + fecha_hora.getMonth() + '-' + fecha_hora.getDate()
const hora = fecha_hora.getHours() + ':' + fecha_hora.getMinutes() + ':' + fecha_hora.getSeconds()


const getLogin = (req, res) => {
    console.log(path.join(__dirname, 'views', 'login.html'))
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
}

const postLogin =  (req, res) => {
    const usuario = req.body.user;
    const contraseña = req.body.password;
    console.log(usuario)
    if(usuario && contraseña){
        console.log('Empezando la conexión')
        DBConnect.query('SELECT * FROM usuario WHERE matricula = ?',[usuario], (error,results) =>{
        console.log(results);
        if (results==0){
            res.render ('login.html' , {
                alert: true,
                alertTitle: "Matricula no registrada",
                alertMessage: "",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'tizalerta/login'
            })
        }
        else{
            const pass = results[0].contraseña;
            const id_usuario = results[0].id;
            if(contraseña != pass){
                res.render ('login.html' , {
                    alert: true,
                    alertTitle: "Incorrect user / password",
                    alertMessage: "",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'tizalerta/login'
                })
                console.log('Usuario incorrecto');
            }else{
                    console.log(fecha)   // BORRAR
                    console.log(hora)   // BORRAR
                    console.log(id_usuario) // BORRAR 
                    
                    
                    // NO DEJAR LOS CONSOLE LOG
                    DBConnect.query('INSERT INTO entrada SET ?', {
                        id_usuario: id_usuario,
                        fecha: fecha,
                        hora: hora
                    })
                    res.render ('login.html' , {
                        alert: true,
                        alertTitle: "Login",
                        alertMessage: "Successful Welcome!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'tizalerta/reportes'
                    })
                
            }}
        })
    }
    

}



module.exports = {getLogin, postLogin}