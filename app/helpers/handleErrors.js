const httpError = (res, req) => {
    res.status(500)
    res.send({error: 'Algo ocurrió'})
}

module.exports = {httpError}