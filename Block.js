let SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, previousHash, senderKey, recieverKey, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
        this.senderKey = senderKey;
        this.recieverKey = recieverKey;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        /**The array.join() method is an inbuilt function in JavaScript
        which is used to join the elements of an array into a string.*/
        while (this.hash.substring(0, difficulty) !== "0000") {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Prev Hash : " + this.previousHash);
        console.log("BLOCK MINED: " + this.hash);
        console.log("Nonce : " + this.nonce);
    }
}

module.exports = Block;