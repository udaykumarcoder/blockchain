export class Block {
  constructor(timestamp, data, previousHash = '') {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    // We'll use a simple counter for proof of work in this demo
    this.nonce = 0;
  }

  // Use a simple synchronous hash function for demonstration purposes
  // In a real app, you'd use crypto.subtle.digest, but it is async
  calculateHash() {
    const dataString = JSON.stringify(this.data);
    const str = this.timestamp + dataString + this.previousHash + this.nonce;

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // Convert to unsigned 32-bit int, pad to 8 chars to allow difficulty matching
    return (hash >>> 0).toString(16).padStart(8, '0');
  }

  mineBlock(difficulty) {
    const target = Array(difficulty + 1).join("0");
    let attempts = 0;
    // Cap attempts to 500,000 to firmly prevent any browser hangs, 
    // guaranteeing the mining animation will resolve.
    while (this.hash.substring(0, difficulty) !== target && attempts < 500000) {
      this.nonce++;
      this.hash = this.calculateHash();
      attempts++;
    }
  }
}
