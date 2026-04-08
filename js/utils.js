// ce fichier regroupe toutes les petites fonctions utiles a tous les scripts :

function printWithDelay() {
  let text = "";
  let delay = 0;
  for (let i = 0; i < arguments.length; i++) {
    if (i != arguments.length - 1) text += " " + arguments[i];
    if (i == arguments.length - 1) delay = arguments[i];
  }

  turnDisplay.innerHTML = text;;
  setTimeout(function () {
    turnDisplay.innerHTML = "";
  }, delay);
}

// Ajouter une manière de mettre des varaibles dedans
function print() {
  let text = "";
  for (let i = 0; i < arguments.length; i++) {
    text += " " + arguments[i];
  }

  turnDisplay.innerHTML = text;
}

function clear() {

  turnDisplay.innerHTML = "";
}

function isGameOver() {
  return false;
}

function getDizaine(number) {
  return (parseInt(number / 10, 10));
}

function getUnite(number) {
  return (number - getDizaine(number) * 10);
}

function restart()
{
  window.location.reload();
}

class Boat{
  static idBoat = []; // Ce tableau permet de tracer l'intégralité des bateaux créer

  constructor(size, name)
  {
    this.id = Boat.getBoatNumber();
    this.size = size;
    this.name = name;

    Boat.idBoat[Boat.getBoatNumber()] = this;

  }

  static delete(id)
  {
    Boat.idBoat.delete(id);
    Boat.getBoatNumber--;
  }

  static getBoatNumber()
  {
    return Boat.idBoat.length;
  }

  static getBoatById(id)
  {
    return Boat.idBoat[id];
  }

  static getNameById(id)
  {
    return Boat.idBoat[id].name;
  }

  static getSizeById(id)
  {
    return Boat.idBoat[id].size;
  }
}