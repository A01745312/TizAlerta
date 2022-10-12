const {httpError} = require('../helpers/handleErrors')


const getItems = (req, res) => {
    res.send({list: [1,2,3]})
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