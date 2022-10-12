require('dotenv').config()

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const { get } = require('http');
const { DBConnect } = require('./config/mysql');

// ********  PUERTO  *********
const PORT = process.env.PORT || 8080


// ******* LLAMA ARCHIVO DE CONEXIÓN CON BD ***********
//const {DBConnect} = require('./config/mysql')


// ********* CREANDO SERVIDOR  **********
const app = express();



// *******   MIDDLEWARE  **********

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));


// ************** VERIFICAR CONEXIÓN CON SERVIDOR  ***************

app.listen(PORT,()=> {
    console.log("Servidor en línea")
})



/* ---------------------------------------------------------------------------------------------------------------  */

app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');


// Rutas asignadas

app.get('/main',(req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'prueba.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/reportes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'report.html'));
});

console.log(path.join(__dirname, 'views', 'prueba.html'));



let fecha_hora = new Date();
const fecha = fecha_hora.getFullYear() + '-' + fecha_hora.getMonth() + '-' + fecha_hora.getDate()
const hora = fecha_hora.getHours() + ':' + fecha_hora.getMinutes() + ':' + fecha_hora.getSeconds()





/* ------------------ LOGIN -------------------- */


app.post("/login", (req, res) => {
    const usuario = req.body.user;
    const contraseña = req.body.password;
    /* connection.query('SELECT * FROM usuario WHERE Matricula = ?', [usuario] , (error,results) =>{
    console.log(results);}) */
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
                    /*console.log(fecha)   // BORRAR
                    console.log(hora)   // BORRAR
                    console.log(id_usuario) // BORRAR 
                    
                    */
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
                        ruta: 'reportes'
                    })
                
            }}
        })
    }}
);


/* ------------------ REPORTES -------------------- */

app.post("/reportes", (req,res) => {
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
            ruta: 'main'
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
        app.get("/main")
    }

});




