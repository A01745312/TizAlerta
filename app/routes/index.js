const express = require('express')
const router = express.Router()
const fs = require('fs')
const { send } = require('process')


const pathRouter = `${__dirname}`

const removeExt = (filename) => {
    return filename.split('.').shift()
}

fs.readdirSync(pathRouter).filter((file) => {
    const noExt = removeExt(file)
    const skip = ['index'].includes(noExt)
    if (!skip){
        router.use(`/${noExt}`, require(`./${noExt}`))
    }
})


router.get('*', (req, res) => {
    res.status(404)
    res.send({error: 'not found'})
})

module.exports = router