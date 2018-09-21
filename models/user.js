var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    hashedPassword: String,
    privateKey: String,
    publicKey: String
})

module.exports = mongoose.model('User', userSchema)
