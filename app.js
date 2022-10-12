// *********** ARCHIVOS REQUERIDOS **************
require('dotenv').config()
const { DBConnect } = require('./config/mysql');

// ******** LIBRERIAS ************
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')


// ******** CONEXION CON LA SUSCRIPCION DE LA APP *****************
const FCM = require('fcm-node');
const serverKey = 'AAAAwJ0hCa4:APA91bEjbMn5zY7xygpQXitNQlQnBaWSPhZ651UATRYooLXnrtKDAcyEsNUPjCAtwB2IQo71vHHByoHuJs9xQkaL87ufx4ScJO9yirNiojIPJPVSoCTo9tGWl2544otDSWmlUGjAIjc9';
const fcm = new FCM(serverKey);


// ********  PUERTO  *********
const PORT = process.env.PORT || 8080


// ********* CREANDO SERVIDOR  **********
const app = express();

// ************** VERIFICAR CONEXIÓN CON SERVIDOR  ***************

app.listen(PORT,()=> {
    console.log("----- ONLINE SERVER -------")
})


// *******   MIDDLEWARE  **********

app.use(express.json()) // Para poder leer en formato json
app.use(express.static(path.join(__dirname, 'public'))) // Declara la ruta estática
app.use(bodyParser.json()) // Poder leer en formato json
app.use(bodyParser.urlencoded({extended:true})) // Para poder jalar datos de los html


// ************ LEER HTML **********

app.engine('html',require('ejs').renderFile) // Para declarar que se lea las plantillas html con ejs
app.set('view engine', 'ejs') // Declara ejs como lector de las plantillas



// ************* RUTAS ASIGNADAS **************

app.get('/main',(req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'prueba.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/reportes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'report.html'));
});


// ************* FECHA & HORA *************

let fecha_hora = new Date(); // Crea un objeto fecha
const fecha = fecha_hora.getFullYear() + '-' + fecha_hora.getMonth() + '-' + fecha_hora.getDate() // Obtiene la fecha por partes
const hora = fecha_hora.getHours() + ':' + fecha_hora.getMinutes() + ':' + fecha_hora.getSeconds() // Obtiene la hora por partes




/* ------------------ LOGIN -------------------- */

app.post("/login", (req, res) => {
    const usuario = req.body.user;
    const contraseña = req.body.password;
    if(usuario && contraseña){
        console.log('Empezando la conexión')
        DBConnect.query('SELECT * FROM usuario WHERE Matricula = ?',[usuario], (error,results) =>{
        console.log(results);
        if (results==0){
            res.render ('login.html' , {
                alert: true,
                alertTitle: "Matricula no registrada",
                alertMessage: "",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
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
                    ruta: 'login'
                })
                console.log('Usuario incorrecto');
            }else{
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
                        ruta: 'reportes'
                    })
                
            }}
        })
    }}
);


/* ------------------ REPORTES -------------------- */

app.post("/reportes", (req,res) => {
    const titulo = req.body.notificacion;
    const descripcion = req.body.descripcion;
    const tipo = req.body.tipo;
    if (tipo == "sismo"){
        query_id_entrada = DBConnect.query('SELECT * FROM entrada ORDER BY id DESC', (error, results) => {
            id_entrada = results[0].id;
        DBConnect.query('INSERT INTO notificacion SET ?', {
            id_suceso: 1,
            id_entrada: id_entrada,
            fecha: fecha,
            hora: hora,
            titulo: titulo,
            descripcion: descripcion
        }),
        res.render ('report.html' , {
            alert: true,
            alertTitle: "Sent",
            alertMessage: "Successful Welcome!",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'main'
        }),
        DBConnect.query('SELECT * FROM notificacion ORDER BY id DESC', (error, results)=>{
            const title = results[0].titulo;
            const desc = results[0].descripcion;
        
            const message = {
        
                to:'dz_Gc-dZS52337nXTX88sa:APA91bHI3jlKuUcA6OFOmI6YlmblAowiTl13kyFMDLo-ILgtc9j-NWkAyJG310Vqbx6D33VI-7Tv5OjKcElueF1lEseY8feHu1dTWOirBwt1cqGbovCEqLmzaRZeg8II96cddP0hKIoi',
                notification: {
                    title: title,
                    body: desc
                },
                data: {
                    title: 'Título de los datos',
                    body: '{"name" : "Laptop", "product_id" : "12345", "final_price" : "15300"}'
                },
            };
            
            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Error al enivar mensaje" + err);
                    console.log("Respuesta: " + response);
                } else {
                    console.log("Mensaje enviado correctamente: ", response);
                }
            })
        })
    })
    } else if (tipo == "inundacion"){
        query_id_entrada = DBConnect.query('SELECT * FROM entrada ORDER BY id DESC', (error, results) => {
            id_entrada = results[0].id;
        DBConnect.query('INSERT INTO notificacion SET ?', {
            id_suceso: 2,
            id_entrada: id_entrada,
            fecha: fecha,
            hora: hora,
            titulo: titulo,
            descripcion: descripcion
        }),
        res.render ('report.html' , {
            alert: true,
            alertTitle: "Sent",
            alertMessage: "Successful Welcome!",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'main'
        }),
        DBConnect.query('SELECT * FROM notificacion ORDER BY id DESC', (error, results)=>{
            const title = results[0].titulo;
            const desc = results[0].descripcion;
        
            const message = {
        
                to:'dz_Gc-dZS52337nXTX88sa:APA91bHI3jlKuUcA6OFOmI6YlmblAowiTl13kyFMDLo-ILgtc9j-NWkAyJG310Vqbx6D33VI-7Tv5OjKcElueF1lEseY8feHu1dTWOirBwt1cqGbovCEqLmzaRZeg8II96cddP0hKIoi',
                notification: {
                    title: title,
                    body: desc
                },
                data: {
                    title: 'Título de los datos',
                    body: '{"name" : "Laptop", "product_id" : "12345", "final_price" : "15300"}'
                },
            };
            
            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Error al enivar mensaje" + err);
                    console.log("Respuesta: " + response);
                } else {
                    console.log("Mensaje enviado correctamente: ", response);
                }
            })
        })
    })
    } else if (tipo == "clima"){
        query_id_entrada = DBConnect.query('SELECT * FROM entrada ORDER BY id DESC', (error, results) => {
            id_entrada = results[0].id;
        DBConnect.query('INSERT INTO notificacion SET ?', {
            id_suceso: 3,
            id_entrada: id_entrada,
            fecha: fecha,
            hora: hora,
            titulo: titulo,
            descripcion: descripcion
        }),
        res.render ('report.html' , {
            alert: true,
            alertTitle: "Sent",
            alertMessage: "Successful Welcome!",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'main'
        }),
        DBConnect.query('SELECT * FROM notificacion ORDER BY id DESC', (error, results)=>{
            const title = results[0].titulo;
            const desc = results[0].descripcion;
        
            const message = {
        
                to:'dz_Gc-dZS52337nXTX88sa:APA91bHI3jlKuUcA6OFOmI6YlmblAowiTl13kyFMDLo-ILgtc9j-NWkAyJG310Vqbx6D33VI-7Tv5OjKcElueF1lEseY8feHu1dTWOirBwt1cqGbovCEqLmzaRZeg8II96cddP0hKIoi',
                notification: {
                    title: title,
                    body: desc
                },
                data: {
                    title: 'Título de los datos',
                    body: '{"name" : "Laptop", "product_id" : "12345", "final_price" : "15300"}'
                },
            };
            
            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Error al enivar mensaje" + err);
                    console.log("Respuesta: " + response);
                } else {
                    console.log("Mensaje enviado correctamente: ", response);
                }
            })
        })
    })
    } 
});




