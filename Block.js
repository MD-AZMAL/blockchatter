class Block {

  constructor(senderKey,recieverKey,message) {

    this.index = 0
    this.previousHash = ""
    this.hash = ""
    this.nonce = 0
    this.data={
        recieverKey:recieverKey,
        senderKey: senderKey,
        message:message
    }
    
}

  get key() {
    return JSON.stringify(this.data) + this.index + this.previousHash + this.nonce
  }

  addData(data) {
    this.data.push(data)
  }
}

module.exports = Block
