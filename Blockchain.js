let SHA256 = require("crypto-js/sha256");
let Block = require('./Block.js');

class Blockchain {
    Blockchain() {
        this.chain = [this.createGenesisBlock()];
        console.log(this.chain)
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, '0', '0', ' ');
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
        for (let i = 1; i < this.chain.length; i++) {
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

/*let Email = new Blockchain();
console.log('Mining block 1...');
Email.addBlock(new Block(1,));

console.log('Mining block 2...');
Email.addBlock(new Block(2, "Bye"));*/
module.exports = Blockchain;