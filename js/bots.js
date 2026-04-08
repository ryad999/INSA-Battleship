function generateBoardBot() {
    for (let i = 0; i < Boat.getBoatNumber(); i++) {
        if(botDifficulty <= 1)generateEasy(Boat.getBoatById(i))
        else generateHard(Boat.getBoatById(i));
    }

}

function generateHitBot() {
    switch (botDifficulty) {
        case 0:
            return botEasyHit()
        case 1:
            return botMediumHit()
        case 2:
            return botHardHit();
        case 3:
            return botImpossibleHit();
    }

}


/**
 * 
 * Fonction de placement de bateaux
 * 
 */


// Easy et Medium
function generateEasy(ship) {
    let direction = 10 ** Math.floor(Math.random() * 2); // = 1 -> Horizontal // = 10 -> Vertical
    let randomStarte = 0;


    // Bateau horizontal
    // Le bateau est horizontal, on doit faire en sorte que : UnitéDuDépart <= 10-LongueurBateau. Sinon le bateau sortira du tableau (vers la droite)
    if (direction == 1) {
        do {
            randomStarte = Math.floor(Math.random() * 100);
        } while (getUnite(randomStarte) >= 10 - ship.size)
    }

    // Bateau vertical
    // Dans le cas vertical, on a juste a prendre le nombre de possibilité (100 - 10*ship.size) et c'est bon
    // nombre de possibilité -> , car le départ du bateau ne peux pas se faire à 
    // l'extremité base (si le bateau est vertical ofc) car il ne rentrera pas
    else {
        randomStarte = (Math.floor(Math.random() * (100 - 10 * ship.size)));
    }

    // Maintenant la case de départ décidé on peux passé a la suite :)
    for (let i = 0; i <= ship.size; i++) {
        // Il y a déjà un bateau sur la trajectoire !. On se prends pas la tete on recommence.
        if (computerSquares[randomStarte + i * direction].classList.contains('taken')) {
            generateEasy(ship);
            return;
        }
    }
    // Si on arrive la, le chemin est safe maintenant on va refiare une boucle mais en ajoutant le bateux
    for (let i = 0; i <= ship.size; i++) {
        computerSquares[randomStarte + i * direction].classList.add('taken', ship.name);
    }
}

// Pour l'instant full hasard mais algo ia après // Hard et Impossible
function generateHard(ship) {
    let direction = 10 ** Math.floor(Math.random() * 2); // = 1 -> Horizontal // = 10 -> Vertical
    let randomStarte = 0;


    // Bateau horizontal
    // Le bateau est horizontal, on doit faire en sorte que : UnitéDuDépart <= 10-LongueurBateau. Sinon le bateau sortira du tableau (vers la droite)
    if (direction == 1) {
        do {
            randomStarte = Math.floor(Math.random() * 100);
        } while (getUnite(randomStarte) >= 10 - ship.size)
    }

    // Bateau vertical
    // Dans le cas vertical, on a juste a prendre le nombre de possibilité (100 - 10*ship.size) et c'est bon
    // nombre de possibilité -> , car le départ du bateau ne peux pas se faire à 
    // l'extremité base (si le bateau est vertical ofc) car il ne rentrera pas
    else {
        randomStarte = (Math.floor(Math.random() * (100 - 10 * ship.size)));
    }

    // Maintenant la case de départ décidé on peux passé a la suite :)
    for (let i = 0; i <= ship.size; i++) {
        // Il y a déjà un bateau sur la trajectoire !. On se prends pas la tete on recommence.
        if (computerSquares[randomStarte + i * direction].classList.contains('taken')) {
            generateHard(ship);
            return;
        }
    }
    // Si on arrive la, le chemin est safe maintenant on va refiare une boucle mais en ajoutant le bateux
    for (let i = 0; i <= ship.size; i++) {
        computerSquares[randomStarte + i * direction].classList.add('taken', ship.name);
    }
}


//**
// 
// 
//  Fonctions de TIR
// 
// 
//  */


// Le bot tire 100% du temps au hasard completement sans stratégie 
function botEasyHit() {
    // On regarde si la case à déjà été tiré, si c'est le cas, on recommence l'opération
    do {
        differenceLoc = Math.floor(Math.random() * 100);
    } while (userSquares[differenceLoc].classList.contains('miss') || userSquares[differenceLoc].classList.contains('boom'));
    return differenceLoc;
}


// Le bot tire au hasard jusqu'à toucher une cible, une fois qu'une cible est touché, il va essayer les cases adjacentes justqu'à faire couler. 
function botMediumHit() {
    const differencePossible = [-10, -1, 1, 10] // Utile pour déterminer au hasard, une case a taper
    let loc;
    // 1èr truc, regarder si au moins un bateau à été touché et non coulé (Utile pour savoir si on alnce un algo ou juste au piff)
    // Nb total de bateau détruit
    let idBoat = -1;
    for (let i = 0; i < Boat.getBoatNumber(); i++) {
        if (userLost[i] > 0 && userLost[i] <= Boat.getSizeById(i)) {
            idBoat = i;
            break;
        }
    }

    if (idBoat == -1) {
        return botEasyHit();
    }

    // Si on arrive ici, cela signifie qu'un bateau à été touché sans être fini
    //Avant toute chose, récupérons la loc du bateu en question qui à été touché (si il y en a plusieurs, on récupère la première)
    let locBase = -1;
    for (let i = 0; i < 99; i++) {
        if (userSquares[i].classList.contains(Boat.getNameById(idBoat)) && userSquares[i].classList.contains('boom')) {
            locBase = i;
            break;
        }
    }


    // Maintenant : Il y a deux cas. Une seule case à été touché, ou plus
    if (userLost[idBoat] == 1) {
        // On va faire un do while pour que si on est proche d'un bord, et que la case (hasard) choisi sort du plateau, on recommence (c'est bourin mais ca marche) OU que la case à déjà été shooté
        do {
            loc = locBase + differencePossible[Math.floor(Math.random() * 4)]; // locBase + {-10,-1,1,10} 
        } while (loc < 0 || loc > 99 || (getDizaine(loc) != getDizaine(locBase) && getUnite(loc) != getUnite(locBase)) || userSquares[loc].classList.contains('miss') || userSquares[loc].classList.contains('boom'))
    }
    else // if(userLost[i] > 1)
    {
        // Bateau horizontal
        // On va tirer au hasard, si on va vers la gauche ou vers la droite :
        let dest = 0;
        while (dest == 0) { dest = Math.random() * 2 - 1; } // Le while permet juste de faire en sorte que le random ne donne pas 0 (et div par 0 ensuite) C'est juste au cas ou
        dest /= Math.abs(dest); // = -1 ou 1

        // Si bateau vertical dest *= 10 (pour avoir une transistion en vertical)
        if (!userSquares[locBase + 1].classList.contains(Boat.getNameById(idBoat))) dest *= 10;

        loc = locBase;
        do {
            loc += dest;
            // Si la case est un miss ou qu'on est sortie de la limite du jeu, on doit faire chemin arriere :
            if (loc < 0 || loc > 99 || (getDizaine(loc) != getDizaine(locBase) && getUnite(loc) != getUnite(locBase)) || userSquares[loc].classList.contains('miss')) {
                dest *= -1;
                loc += dest; // On revient en arrière sinon on sort de la boucle
            }
        } while (userSquares[loc].classList.contains('boom'))
    }
    return loc;
}

// L'idée va être de tirer sur que des cases impaires, puis appelé l'algo (botMediumHit quand un bateau à été touché sans être détruit)
function botHardHit() {
    for (let i = 0; i < Boat.getBoatNumber(); i++) {
        if (userLost[i] > 0 && userLost[i] <= Boat.getSizeById(i)) {
            return botMediumHit();
        }
    }

    // Aucun bateau n'a été touché sans coulé. On va prendre les diagonales. Voici l'idée :
    // Les diagonales sont les nombre ou le chiffre des dizaine et unité sont tout deux paires ou impaire. On va donc générer au pif un nombre des dizaine. En fonction de la parité de ce dernier on va générer (au pif) le nombre des unité
    let loc;

    do {
        loc = Math.floor(Math.random() * 10);

        if (loc % 2 == 0) loc = 10 * loc + Math.floor(Math.random() * 5) * 2 // Cas pair
        else loc = 10 * loc + Math.floor(Math.random() * 5) * 2 + 1 // Cas impaire
    } while (userSquares[loc].classList.contains('miss') || userSquares[loc].classList.contains('boom'));
    return (loc);

}

// Le bot a 100% De réussite (c'est surtout pour le debug)
function botImpossibleHit() {
    for (let i = 0; i < 100; i++) {
        if (userSquares[i].classList.contains('taken') && !userSquares[i].classList.contains('boom')) {
            return i;
        }
    }
    return 0;
}