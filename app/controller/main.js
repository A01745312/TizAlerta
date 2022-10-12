const {httpError} = require('../helpers/handleErrors')
const express = require('express')
const bodyParser = require('body-parser')

const path = require('path');
const { dirname } = require('path');


const main = express()


//     ********  Middleware  **********

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended:true}));
main.use(express.static(path.join(__dirname, 'public')))

main.engine('html',require('ejs').renderFile);
main.set('view engine', 'ejs');


const getMain = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'prueba.html'));
    
}
module.exports = {getMain}