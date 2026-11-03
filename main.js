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
stopConsoleTimer();

// Array base con 6 parejas de Pokémon (12 elementos en total)
const pokemonList = [
  "pikachu",
  "pikachu",
  "charmander",
  "charmander",
  "bulbasaur",
  "bulbasaur",
  "squirtle",
  "squirtle",
  "jigglypuff",
  "jigglypuff",
  "snorlax",
  "snorlax",
];

/**
 * Algoritmo de barajado Fisher-Yates
 * @param {Array} array - Array de elementos a desordenar
 * @returns {Array} El mismo array mezclado aleatoriamente
 */
function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generar índice aleatorio entre 0 e i
    const j = Math.floor(Math.random() * (i + 1));

    // Intercambiar elementos usando desestructuración
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

console.log("Array original:", [...pokemonList]);

const shuffledPokemon = shuffleCards(pokemonList);

console.log("Array barajado (Fisher-Yates):", shuffledPokemon);

/**
 * Obtiene los datos de un Pokémon desde la PokéAPI
 * @param {string|number} pokemonId - Nombre o ID del Pokémon
 * @returns {Object|null} Objeto con el nombre y la URL del sprite o null si hay error
 */
async function fetchPokemonData(pokemonId) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return {
      name: data.name,
      image: data.sprites.front_default,
    };
  } catch (error) {
    console.error("No se pudo recuperar el Pokémon:", error);
    return null;
  }
}

// Prueba de carga asíncrona de un Pokémon específico
async function testApiConnection() {
  console.log("[PokéMatch Pro] Consultando la PokéAPI...");
  const pokemon = await fetchPokemonData("pikachu");
  if (pokemon) {
    console.log("Pokémon obtenido con éxito:", pokemon);
  }
}

testApiConnection();

async function fetchPokemonsData() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    console.table(data.results);

    return data.results.map((a) => ({ Nombre: a.name, Imagen: a.url }));
  } catch (error) {
    console.error("No se pudo recuperar el Pokémon:", error);
    return null;
  }
}

async function fetchPokemonsImages(urlPokemon) {
  try {
    const response = await fetch(urlPokemon);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Properties:", data);

    return {
      Nombre: data.name,
      Imagen: data.sprites.front_default,
    };
  } catch (error) {
    console.error("No se pudo recuperar el Pokémon:", error);
    return null;
  }
}

// Prueba de carga asíncrona de un Pokémon específico
async function testObtenerPokemons() {
  console.log("[PokéMatch Pro] Consultando la PokéAPI...");
  const pokemon = await fetchPokemonsData();
  console.log("Pokémons obtenidos con éxito:", pokemon);

  const resolvedPokemons = [];
  for (const pokemons of pokemon) {
    const properties = await fetchPokemonsImages(pokemons.Imagen);
    resolvedPokemons.push(properties);
  }
  console.log("Pokémons resueltos:", resolvedPokemons);
  //Preguntar al profe por qué recibe url imagen y no una url normal.
  fetchPokemonsImages(pokemon[0].Imagen).then((data) => {
    console.log("Pokémon:", data);
  });

  const gameBoard = window.document.getElementById("game-board");
  console.log("gameBoard:", gameBoard);

  gameBoard.innerHTML = `<h2>Lista de Pokémons obtenidos:</h2>
  <ul>
  ${resolvedPokemons.map(
    (pokemon) =>
      `
    <li>Pokemon name: ${pokemon.Nombre.charAt(0).toUpperCase() + pokemon.Nombre.slice(1)}
    <img src="${pokemon.Imagen}" alt="${pokemon.Nombre}"></li>
  `,
  )}
  </ul>

   `;
}

testObtenerPokemons();
