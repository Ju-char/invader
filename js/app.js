function onClickOnPixel(event) {

    // Etape 2.2 : Une fois le clic fait sur la cellule je veux récupérer la cellule cliqué
    var cell = event.target;


    // Etape 2.3 : Sur cette cellule, s'il n'y a rien je met la classe bg-black
    //             s'il y a la classe je l'enlève
    //
    cell.classList.toggle('bg-black');

    // classList.toggle correspon au comportement suivant :
    // if (cell.classList.contains('bg-black')) {
    //     cell.classList.remove('bg-black');
    // } else {
    //     cell.classList.add('bg-black');
    // }
}

// Objectif :
// Etape 1 - Créer un tableau de 8x8 cases
// Etape 2 - Réagir au clic sur une cellule

// Étape 1.1 - Récupérer la "target"

// En mettant un display flex sur la div invader
// Pas besoin de gestion de ligne et de colonne
// je peux directement mettre toutes mes cellules dedans
var gameBoard = document.getElementById('invader');


// Etape 1.2 - "Boucler" 8x8 fois
var nbCellules = 8 * 8;
for (var indexCell = 0; indexCell < nbCellules; indexCell++) {

    // Etape 1.3 - Dans la boucles générer une cases
    var cell = document.createElement('div');
    cell.classList.add('pixel');
    gameBoard.appendChild(cell);

    // Etape 2.1 : Je veux réagir au clic sur chaque cellule
    cell.addEventListener('click', onClickOnPixel);
}