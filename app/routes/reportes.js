const express = require('express')
const router = express.Router()
//const {checkOrigin} = require('../middleware/origin')
const {getReportes, postReportes} = require('../controller/reportes')


router.get('/', getReportes)


router.post('/',  postReportes)



module.exports = router