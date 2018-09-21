let SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, data, previousHash) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
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
        console.log("Prev Hash : "+this.previousHash);
        console.log("BLOCK MINED: " + this.hash);
        console.log("Nonce : "+this.nonce);
    }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let Email = new Blockchain();
console.log('Mining block 1...');
Email.addBlock(new Block(1,"Hello"));

console.log('Mining block 2...');
Email.addBlock(new Block(2, "Bye"));