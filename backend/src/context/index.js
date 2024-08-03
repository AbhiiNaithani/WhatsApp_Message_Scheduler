// context.js
class Context {
    constructor() {
      this.store = {};
    }
  
    set(key, value) {
      this.store[key] = value;
    }
  
    get(key) {
      return this.store[key];
    }
  }
  
  module.exports = new Context();
  