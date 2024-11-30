const User = require('../models/user.model')

const createUser = async (data) => {
    console.log(data)
    return await User.create(data)
}

module.exports = {
    createUser
}