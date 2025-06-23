import { agregarEnEstacion } from "./agregarEnEstacion.js";

export function jugar(player, estaciones) {
  const dado1 = player.tirar();
  const dado2 = player.tirar();
  console.log("Tirado Dados .....");
  console.log(dado1);
  console.log(dado2);
  console.log("tokens del player iniciales");
  console.log(player.getTokens());

  if (dado1 === 6) player.anota();
  if (dado2 === 6) player.anota();

  if (dado1 !== 6 && dado2 !== 6) {
    agregarEnEstacion(dado1, dado2, estaciones, player);
  } else {
    if (dado1 !== 6) agregarEnEstacion(dado1, null, estaciones, player);
    if (dado2 !== 6) agregarEnEstacion(null, dado2, estaciones, player);
  }
  estaciones.forEach((estacion, index) => {
    if (estacion.length > 0) {
      console.log(`Estación ${index + 1}: [${estacion.join(", ")}]`);

      estacion.forEach((jugada) => {
        console.log("[" + jugada + "]");
      });
    }
  });
  console.log("tokens del player finales");
  console.log(player.getTokens());
}
