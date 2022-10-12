const {httpError} = require('../helpers/handleErrors')
const express = require('express')

const path = require('path');


const main = express()

main.engine('html',require('ejs').renderFile);
main.set('view engine', 'ejs');

const getItems = (req, res) => {
    res.sendFile(path.join(require('../views/prueba.html')));
    
}


const getItem = (req, res) => {
    
}

const createItem = (req, res) => {
}

const updateItem = (req, res) => {
    
}

const deleteItem = (req, res) => {
    
}


module.exports = {getItems, getItem, createItem, updateItem, deleteItem}