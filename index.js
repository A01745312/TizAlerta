// Rutas absolutas
const path = require('path');


const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

// create serverr
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/main',(req)=>{
    res.sendFile(path.join(__dirname, 'views', 'prueba.html'));
});

console.log(path.join(__dirname, 'views', 'prueba.html'));

app.listen(8080,()=>console.log("Servidor"));