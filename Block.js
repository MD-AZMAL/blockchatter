class Block {

  constructor(index,previousHash,senderKey,receiverKey,message) {

    this.index = index;
    this.previousHash = previousHash;
    this.hash = "";
    this.nonce = 0;
    this.data={
        receiverKey:receiverKey,
        senderKey: senderKey,
        message:message
    };
    
}

  get key() {
    return JSON.stringify(this.data) + this.index + this.previousHash + this.nonce
  }

  addData(data) {
    this.data.push(data)
  }
}

module.exports = Block
