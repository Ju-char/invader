// Objectif :
// Créer un tableau de 8x8 cases

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
}
