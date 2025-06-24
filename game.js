class Player {
  constructor(nombre) {
    this.nombre = nombre;
    this.tokens = 20;
  }

  tirarDado() {
    return Math.floor(Math.random() * 6) + 1;
  }

  perderFicha() {
    if (this.tokens > 0) this.tokens--;
  }

  ganarFichas(n) {
    this.tokens += n;
  }

  tieneFichas() {
    return this.tokens > 0;
  }
}

const jugador1 = new Player("Jugador 1");
const jugador2 = new Player("Jugador 2");

let turno = 1; // 1 = jugador1, 2 = jugador2
let estaciones = [[], [], [], [], []]; // Estaciones 1 a 6

const fichasJ1 = document.getElementById("fichas-j1");
const fichasJ2 = document.getElementById("fichas-j2");
const turnoLabel = document.getElementById("turno");
const dado1Div = document.getElementById("dado1");
const dado2Div = document.getElementById("dado2");
const mensaje = document.getElementById("mensaje");
const estacionesDiv = document.getElementById("estaciones");
const lanzarBtn1 = document.getElementById("lanzarBtn1");
const lanzarBtn2 = document.getElementById("lanzarBtn2");

function actualizarEstaciones() {
  estacionesDiv.innerHTML = "";
  estaciones.forEach((estacion, i) => {
    const estDiv = document.createElement("div");
    estDiv.classList.add(
      "estacion",
      "flex",
      "flex-col",
      "justify-start",
      "items-center",
      "bg-white/10",
      "rounded",
      "p-4",
      "w-24",
      "h-48",
      "text-center"
    );

    estDiv.innerHTML = `<strong> ${i + 1}</strong>`;
    const fichaContainer = document.createElement("div");
    fichaContainer.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "mt-2",
      "gap-1"
    );

    estacion.forEach(() => {
      const fichaImg = document.createElement("img");
      fichaImg.src = "./resources/poker-piece-svgrepo-com.svg";
      fichaImg.alt = "ficha";
      fichaImg.classList.add("w-6", "h-6"); // o el tamaño que quieras
      fichaContainer.appendChild(fichaImg);
    });

    estDiv.appendChild(fichaContainer); // ❗ ESTO FALTABA

    estacionesDiv.appendChild(estDiv);
  });
}

function actualizarBotones() {
  lanzarBtn1.disabled = turno !== 2; // solo habilita para Jugador 1
  lanzarBtn2.disabled = turno !== 1; // solo habilita para Jugador 2
}

function actualizarUI() {
  fichasJ1.textContent = jugador1.tokens;
  fichasJ2.textContent = jugador2.tokens;
  turnoLabel.textContent = turno === 1 ? "Jugador 1" : "Jugador 2";
  actualizarEstaciones();
}

function agregarEnEstacion(dado, jugador) {
  if (dado === 6) {
    jugador.perderFicha();
    return;
  }

  const idx = dado - 1;
  if (estaciones[idx].length < dado) {
    jugador.perderFicha();
    estaciones[idx].push("ficha");
  } else {
    jugador.ganarFichas(dado);
    estaciones[idx] = [];
  }
}

function lanzarTurno() {
  if (!jugador1.tieneFichas()) {
    mensaje.textContent = "🎉 ¡Jugador 1 ganó!";
    lanzarBtn1.disabled = true;
    return;
  }
  if (!jugador2.tieneFichas()) {
    mensaje.textContent = "🎉 ¡Jugador 2 ganó!";
    lanzarBtn2.disabled = true;
    return;
  }

  const jugadorActual = turno === 1 ? jugador1 : jugador2;
  const dado1 = jugadorActual.tirarDado();
  const dado2 = jugadorActual.tirarDado();

  dado1Div.textContent = `${dado1}`;
  dado2Div.textContent = `${dado2}`;

  mensaje.textContent = "";

  agregarEnEstacion(dado1, jugadorActual);
  agregarEnEstacion(dado2, jugadorActual);

  actualizarUI();

  // Cambiar turno
  turno = turno === 1 ? 2 : 1;
  actualizarUI();
  actualizarBotones();
}

lanzarBtn1.addEventListener("click", lanzarTurno);
lanzarBtn2.addEventListener("click", lanzarTurno);
actualizarUI();
actualizarBotones();
