const express = require('express')
const router = express.Router()
//const {checkOrigin} = require('../middleware/origin')
const {getItems, getItem, createItem,updateItem, deleteItem} = require('../controller/main')


router.get('/', getItems)

router.get('/:id', getItem)

router.post('/',  createItem)

router.patch('/:id', updateItem)

router.delete('/:id', deleteItem)


module.exports = router