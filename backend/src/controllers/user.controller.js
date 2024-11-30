'use strict'
const UserService = require('../services/user.services')

const createUser = async (req, res, next) => {
    return await res.json(UserService.createUser(req.body))
} 

module.exports = {
    createUser
}