let Block = require('./Block')
let sha256 = require('js-sha256')

class Blockchain {

   constructor(genesisBlock) {

     this.blocks = []
     this.addBlock(genesisBlock)
   }

   addBlock(block) {
      block.hash = this.generateHash(block)
      this.blocks.push(block)
   }

   getNextBlock(data) {

      let block = new Block()
       
     

      let previousBlock = this.getPreviousBlock()
      block.index = this.blocks.length
      block.previousHash = previousBlock.hash
      block.hash = this.generateHash(block)
     
      return block
   }

    generateHash(block) {

     let hash = sha256(block.key)
      console.log('Hashing')
     while(!hash.startsWith("0000")) {
       block.nonce += 1
       hash = sha256(block.key)
      //  console.log(hash)
     }

     return hash

   }

   getPreviousBlock() {
     return this.blocks[this.blocks.length - 1]
   }

}

module.exports = Blockchain
