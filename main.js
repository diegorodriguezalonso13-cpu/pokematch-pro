// 1. Constantes y Variables de Estado
const TOTAL_PAIRS = 6;

let moves = 0;
let matchedPairs = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;

// 2. Selección de elementos del DOM
const movesElement = document.getElementById("moves-count");
const pairsElement = document.getElementById("pairs-count");

function updateBoardUI() {
  if (movesElement) movesElement.textContent = moves;
  if (pairsElement)
    pairsElement.textContent = `${matchedPairs} / ${TOTAL_PAIRS}`;
}

updateBoardUI();

// 3. Temporizador por Consola
let secondsElapsed = 0;
let timerInterval = null;

function startConsoleTimer() {
  console.log("[PokéMatch Pro] Iniciando temporizador por consola...");
  timerInterval = setInterval(() => {
    secondsElapsed++;
    console.log(`⏱️ Tiempo transcurrido: ${secondsElapsed}s`);
  }, 1000);
}

function stopConsoleTimer() {
  clearInterval(timerInterval);
  console.log(`⏹️ Temporizador detenido a los ${secondsElapsed} segundos.`);
}

// Iniciar prueba
startConsoleTimer();
