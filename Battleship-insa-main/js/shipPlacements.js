// Création des deux plateaux de jeu
// Grid -> Graphique // Square --> Plateau de jeu (tableau de 100 casea)
createBoard(userGrid, userSquares);
createBoard(computerGrid, computerSquares);

// On init les events pour les boutons
rotateButton.addEventListener('click', rotate);
resetButton.addEventListener('click', reset);
startButton.addEventListener('click', start);
replayButton.addEventListener('click', restart);

//Creation du board 
function createBoard(grid, squares) {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.dataset.id = i;
    grid.appendChild(square);
    squares.push(square);
  }
  ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
    casePreciseDernierBateauSelect = e.target.id;
  }))

  ships.forEach(ship => ship.addEventListener('dragstart', dragStart));
  squares.forEach(square => square.addEventListener('dragstart', dragStart));
  squares.forEach(square => square.addEventListener('dragover', dragOver));
  squares.forEach(square => square.addEventListener('drop', dragDrop));
}

// Delete Board (utile pour le reset)
function deleteBoard(grid, squares) {
  grid.innerHTML = '';

  for (let i = 0; i < 100; i++) {
    squares.pop();
  }
}

//Reset les bateaux
function reset() {

  // 1 - On supprimer le tableau et en recrée un vierge
  deleteBoard(userGrid, userSquares);
  createBoard(userGrid, userSquares);

  // 2 - On reset les bateaux d'en bas
  displayGrid.innerHTML = originalGrid.innerHTML;

  // 3 - Récupérer les nouveaux bateaux et rattacher les événements
  ships = displayGrid.querySelectorAll('.ship'); // Récupère les nouveaux bateaux recréés
  ships.forEach(ship => {

    ship.addEventListener('dragstart', dragStart); // Réattache dragstart
    ship.addEventListener('mousedown', (e) => { casePreciseDernierBateauSelect = e.target.id });
  });

  // On relie de nouveau les bateaux d'affichage (pour les nouvelles rotation)
  destroyer = document.querySelector('.destroyer-container');
  submarine = document.querySelector('.submarine-container');
  cruiser = document.querySelector('.cruiser-container');
  battleship = document.querySelector('.battleship-container');
  carrier = document.querySelector('.carrier-container');

  // Si besoins on les mets dans le meme sens qu'elle était avant
  if (!isHorizontal) {
    rotate();
    isHorizontal = false;
  }

  clear();

  // 4 - On réinitialise les variables permettant de manipuler les bateaux
  draggedShip = null;
  draggedShipLength = null;


}

function start() {
  if(!allShipsPlaced)
  {
    printWithDelay("Vous n'avez pas fini de placer vos bateaux !", 5000);
    return;
  }

  startSinglePlayer(userSquares)

  // on enleve les boutons de jeu
  buttons.innerHTML = "";
}

//Rotate the ships
function rotate() {
  destroyer.classList.toggle('destroyer-container-vertical');
  submarine.classList.toggle('submarine-container-vertical');
  cruiser.classList.toggle('cruiser-container-vertical');
  battleship.classList.toggle('battleship-container-vertical');
  carrier.classList.toggle('carrier-container-vertical');
  isHorizontal = !isHorizontal;
}


function dragStart() {
  draggedShip = this;
  draggedShipLength = this.childNodes.length;
}

// Permet de déposer le bateau
function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {

  let nomDernierBateauSelect = draggedShip.lastChild.id; // On stocke le bateau sélectionner -> ex : cruiser-2
  let nomRaccourciDernierBateau = nomDernierBateauSelect.slice(0, -2);   // Stocke juste le nom du bateau : submarine-2 -> submarine
  let tailleDernierBateauSelect = parseInt(nomDernierBateauSelect.substr(-1)); // Taille du bateau : !!! commence a partir de 0 du coup
  let derniereCaseDernierBateauSelect, premiereCaseDernierBateauSelect;
  casePreciseDernierBateauSelect = parseInt(casePreciseDernierBateauSelect.substr(-1)); // Correspond a la case précise prise du bateau. Uniquement le nombre (1,2,3...)

  derniereCaseDernierBateauSelect = 10 ** Number(!isHorizontal) * (tailleDernierBateauSelect - casePreciseDernierBateauSelect) + parseInt(this.dataset.id); // 10**Number(!isHorizontal) // = 10 si vertical // = 1 si horizontal
  premiereCaseDernierBateauSelect = derniereCaseDernierBateauSelect - tailleDernierBateauSelect * 10 ** Number(!isHorizontal);

  // Premier econdition -> meme ligne (chiffre des dizaines identitque) MARCHE APS
  // Deuxième condition -> meme colonnes (chiffre des dizaines identique => last - first divisible par 10)
  // Derniere conditions (si une des deux case est plus petite que 0 ou plsu grande que 100)
  let dizainefirst = getDizaine(premiereCaseDernierBateauSelect);
  let unitefirst = getUnite(premiereCaseDernierBateauSelect);

  let dizainelast = getDizaine(derniereCaseDernierBateauSelect);
  let unitelast = getUnite(derniereCaseDernierBateauSelect);

  // Check si on est bien dans la zone
  // les deux premieres conditions sont la pour vérifier qu'on n'est pas sur deux lignes/ deux colonnes
  // Les deux suivantes sont la pour vérifier si on sors pas en haut et en bas
  if ((dizainefirst != dizainelast && unitefirst != unitelast) || derniereCaseDernierBateauSelect > 100 || premiereCaseDernierBateauSelect < 0) {
    printWithDelay("Emplacement Impossible, vous sortez de la limite !", 5000);
    return;
  }


  // Avant tout on va checker si il n'y a pas de bateau en plein milieu (-> superposition de bateaux)
  for (let i = premiereCaseDernierBateauSelect; i <= derniereCaseDernierBateauSelect; i += 10 ** Number(!isHorizontal)) {
    if (userSquares[i].classList.contains("taken")) {
      printWithDelay("Emplacement Impossible, vous superposez un bateau !", 5000);
      return;
    }
  }

  for (let i = premiereCaseDernierBateauSelect; i <= derniereCaseDernierBateauSelect; i += 10 ** Number(!isHorizontal)) {
    let directionClass;

    if (i === premiereCaseDernierBateauSelect) directionClass = 'start';
    else if (i === derniereCaseDernierBateauSelect) directionClass = 'end';
    else { // Si le bateau n'est ni le début, ni la fin, on doit mettre une balise 'one', 'two' ou 'three' car les balise int ne sont pas autorisés
      switch (i.toString()-premiereCaseDernierBateauSelect)
        {
          case 1 * 10 ** Number(!isHorizontal): // Le 10 ** Number(!isHorizontal) Permet de prendre en compte si le bateau est vertical ou horizontal
            directionClass = 'one';
            break;
          case 2 * 10 ** Number(!isHorizontal):
            directionClass = 'two';
            break;
          case 3 * 10 ** Number(!isHorizontal):
            directionClass = 'three';
            break;
        }
      }

    if (isHorizontal) userSquares[i].classList.add('taken', 'horizontal', directionClass , nomRaccourciDernierBateau);
    if (!isHorizontal) userSquares[i].classList.add('taken', 'vertical', directionClass, nomRaccourciDernierBateau);
  }

  displayGrid.removeChild(draggedShip); // Enlever le bateau

  if (!displayGrid.querySelector('.ship')) {
    print("Tous les bateaux sont placés !, Cliquez sur \"Commencer la partie\" quand vous serez prêt !");
    allShipsPlaced = true; // check que tous les bateaux sont mis (renvoie le premier div)
  }
}

