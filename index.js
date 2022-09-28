// cSpell:disable

// Rutas absolutas
const path = require('path');


const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

// create server
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/main',(req, res)=>{
    res.sendFile(path.join(__dirname, 'view', 'prueba.html'));
});

console.log(path.join(__dirname, 'views', 'prueba.html'));

app.listen(8080,()=>console.log("Servidor"));
