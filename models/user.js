var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    hashedPassword: String,
    privateKey: String,
    publicKey: String,
    chain:[{
        index: Number,
        prevHash: String,
        hash: String,
        nonce: Number,
        senderKey: String,
        recieverKey: String,
        message: String
    }]
})

module.exports = mongoose.model('User', userSchema)
