export class Player {
  #tokens = 20;

  tirar() {
    let num = Math.floor(Math.random() * (7 - 1)) + 1;
    return num;
  }
  anota() {
    if (this.#tokens > 0) {
      this.#tokens--;
    }
  }

  lleno(num) {
    if (num > 0) {
      this.#tokens += num;
    }
  }
  getTokens() {
    return this.#tokens;
  }
}
