const express = require('express')
const router = express.Router()
//const {checkOrigin} = require('../middleware/origin')
const {getMain} = require('../controller/main')


router.get('/', getMain)


module.exports = router