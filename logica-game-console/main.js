import { Player } from "./Player.js";
import { jugar } from "./jugar.js";
let estaciones = [[], [], [], [], []];
const p1 = new Player();
const p2 = new Player();

let iteraciones = 0;
while (p1.getTokens() > 0 || p2.getTokens() > 0) {
  console.log("*************Tiro del Jugador 1 *************");
  jugar(p1, estaciones);
  console.log("*************Tiro del Jugador 2 *************");
  jugar(p2, estaciones);
  if (p1.getTokens() === 0) {
    console.log("Jugador 1 gano");
  } else if (p2.getTokens() === 0) {
    console.log("Jugador 2 gano");
  }
  iteraciones++;
}
console.log(iteraciones);
