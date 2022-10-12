const express = require('express')
const router = express.Router()
//const {checkOrigin} = require('../middleware/origin')
const {getLogin, postLogin} = require('../controller/login')


router.get('/', getLogin)


router.post('/',  postLogin)


module.exports = router