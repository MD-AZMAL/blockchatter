const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cryptojs = require('crypto-js'),
    User = require('./models/user.js');

mongoose.connect('mongodb://localhost:27017/db', {
    useNewUrlParser: true
});

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/signup', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!err && user) {
            res.send('User Exist')
        } else {
            let prvK = cryptojs.SHA256(Date.now());
            let pubK = cryptojs.SHA256(prvK);
            if (!user) {
                let tmp = {
                    email: req.body.email,
                    name: req.body.name,
                    hashedPassword: cryptojs.SHA256(req.body.password),
                    privateKey: prvK,
                    publicKey: pubK
                }
                User.create(tmp, (err, user) => {
                    if (!err) {
                        console.log('User created');
                        console.log(user);
                        res.send('User Created')
                    } else {
                        console.log('Error : ' + err);
                        res.send('Error : ' + err);
                    }
                })
            }
        }
    })
})

app.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!err) {
            if (user) {
                if (cryptojs.SHA256(req.body.password) == user.hashedPassword) {
                    console.log('Successfully logged In');
                    res.send('login successfull');
                } else {
                    console.log('incorrect password');
                    res.send('Incorrect password');
                }
            } else {
                console.log('User not found');
                res.send('User not found');
            }
        } else {
            console.log('Error : ' + err);
            res.send('Error : ' + err);
        }
    })
})

app.listen(3000, () => {
    console.log('server started');
})