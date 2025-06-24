export function agregarEnEstacion(d1, d2, estaciones, player) {
  estaciones.forEach((estacion, index) => {
    if (d1 !== null && d1 === index + 1) {
      if (estacion.length < d1) {
        player.anota();
        estacion.push("1");
      } else if (estacion.length === d1) {
        player.lleno(d1);
        estaciones[index].length = 0;
      }
    }
    if (d2 !== null && d2 === index + 1) {
      if (estacion.length < d2) {
        player.anota();
        estacion.push("1");
      } else if (estacion.length === d2) {
        player.lleno(d2);
        estaciones[index].length = 0;
      }
    }
  });
}
