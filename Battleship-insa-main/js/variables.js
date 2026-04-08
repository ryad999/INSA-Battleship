// Ce fichier permet de stocker l'intégralité des variables utilisé le long du jeu (pendant le placement des bateaux / jeu solo/ jeu multi)
// Nous les avons mis dans un fichier séparé afin que tout soit plus lisible et pour éviter les doublons

// Les différents boutons en bas de l'écran
const startButton = document.querySelector('#start');
const rotateButton = document.querySelector('#rotate');
const resetButton = document.querySelector('#reset');
const replayButton = document.querySelector('#replay');
const buttons = document.querySelector('#setup-buttons');

// Les différents plateaux de jeu 
const userGrid = document.querySelector('.grid-user'); // Plateau du joueur
const computerGrid = document.querySelector('.grid-computer'); // Plateau de l'ordi
const displayGrid = document.querySelector('.grid-display'); // Les bateaux pour la selection
const originalGrid = document.querySelector('.grid-original'); // Les bateaux pour la selection (backup utile pour le reset)

// TEster a metrte en const
// Tous les bateaux en bas avant de les placer
let ships = document.querySelectorAll('.ship');
let destroyer = document.querySelector('.destroyer-container');
let submarine = document.querySelector('.submarine-container');
let cruiser = document.querySelector('.cruiser-container');
let battleship = document.querySelector('.battleship-container');
let carrier = document.querySelector('.carrier-container');

let allShipsPlaced = false;

// Message indicatif (*)
const turnDisplay = document.querySelector('#whose-go');

let userSquares = []; // Tableau de ma partie , 1d 100 cases
let computerSquares = []; // Tableau du coté bot, 1d 100 cases
let alreadyShow = []; // Tableau listant toutes les cases déjà viser (en attaque)
let userLost = [0,0,0,0,0]; // Tableau contenant tous les bateaux de l'user perdu, on l'init a 0 pour incrémenter plus tard
let enemyLost = [0,0,0,0,0]; // Tableau contenant tous les bateaux de l'adeversaire perdu, on l'init a 0 pour incrémenter plus tard

let isHorizontal = true;
const width = 10;

let shotFired = -1;

let casePreciseDernierBateauSelect; // Précisement le fragement de bateau cliquer
let draggedShip;

// Easy -> Tir et Placement aléaoitre (0)
// // Medium -> Placement aléatoire et proba de touché légérement augmenter (1)
// // Hard -> Placement suivant modèle math + attaque suivant modèle math (2)
// // Impossible : placement Hard + attaque 100% bonné (c'est plus un modèle pour tester ^^) (3)
let botDifficulty = 0;

let currentPlayer = "computer"; // Un peu contre intuitif, il faut mettre le nom de la personne qui NE commence PAS
let player1 = "user"; // Nom du joueur 1 (le joueur sur la session)
let player2 = "computer"; // Nom du joueur 2 (adversaire)

const reflexionComputer = 100; // temps de reflexion du bot en ms (utile pour debug) , defaut : 1000
const debugMode = false; // Seul l'ordinateur joue (pour le debug)


// Single Player & Multi Player

new Boat(1, 'destroyer');
new Boat(2, 'submarine');
new Boat(2, 'cruiser');
new Boat(3, 'battleship');
new Boat(4, 'carrier');




