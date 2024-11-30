'use strict'

const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.post('/create-user', userController.createUser)



module.exports = router


