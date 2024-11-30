'use strict'

const router = require('express').Router()
const routerUser = require('./user')


const initRouter = (app) => {
    app.use('/api/user', routerUser)
}



module.exports = initRouter

