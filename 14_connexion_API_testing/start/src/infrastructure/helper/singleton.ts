export class Singleton {
  static instance = null as Singleton | null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}
