const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    avatar: String,
    list_id:[{ type: mongoose.Schema.Types.ObjectId, ref: 'list' }],
    token: String,
    salt: String, 
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel