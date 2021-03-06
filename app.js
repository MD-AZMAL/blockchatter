const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cryptojs = require('crypto-js'),
    User = require('./models/user.js');

let Block = require('./Block')

let Blockchain = require('./Blockchain')

// create genesis block
let genesisBlock = new Block(0, "0000000000000000000000000000000000000000000000000000000000000000000", '0', '0', '0');
let blockchain = new Blockchain(genesisBlock)



mongoose.connect('mongodb://localhost:27017/db', {
    useNewUrlParser: true
});

var app = express();



app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    req.headers.new = 'lorem'
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');

})

app.get('/signup', (req, res) => {
    res.render('signup');
})

app.get('/blocks', (req, res) => {
    res.render('block',{
        blocks: blockchain.blocks
    });
})

app.get('/compose', (req, res) => {
    res.render('compose');
})

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
                if (req.body.password != req.body.password2) {
                    res.redirect('/signup');
                } else {
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
                            res.redirect('/login');
                        } else {
                            console.log('Error : ' + err);
                            res.send('Error : ' + err);
                        }
                    })
                }
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
                    res.redirect('/');
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

app.post('/send', (req, res) => {
    let blockIndex = blockchain.blocks.length - 1
    console.log(req.body.senderKey)
    let block = new Block(blockIndex + 1, blockchain.blocks[blockIndex].hash, req.body.senderKey, req.body.receiverKey, req.body.message);
    blockchain.addBlock(block);
    console.log(block);
    res.redirect('/blocks');
});

app.listen(3000, () => {
    console.log('server started');
})

/*
blockchain.addBlock(block)


let anotherdata = new Data("Azam","Jerry",10)
let block1 = blockchain.getNextBlock([data])
blockchain.addBlock(block1)

let anotherdata1 = new Data("Azam","Jerry",10)
let block2 = blockchain.getNextBlock([data])
blockchain.addBlock(block2)
*/
console.log(blockchain.blocks[0].data)
