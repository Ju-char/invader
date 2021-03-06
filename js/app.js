// Objectif :
// Etape 1 - Créer un tableau de 8x8 cases
// Etape 2 - Réagir au clic sur une cellule
// Etape 3 - Laisser l'utilisateur choisir la taille de la grille
// Bonus 1 - Refactoriser sous forme de module tt notre code
// Bonus 2 - Ajouter un champ pour gérer la cellSize
// Bonus 3 - La palette

var app = {
    gameBoard: null,

    gridSizeInput: null,

    cellSizeInput: null,

    cellSize: 25,

    styles: [
        'plain',
        'empty',
        'light',
        'highlight',
    ],

    selectedStyle: 'plain',

    drawGrid: function (gridSize) {

        // Étape 1.1 - Récupérer la "target"

        // En mettant un display flex sur la div invader
        // Pas besoin de gestion de ligne et de colonne
        // je peux directement mettre toutes mes cellules dedans

        // Avec les flexbox, pour avoir une grille "carré",
        // j'ai besoin de définir la width de la div.invader
        // en fonction de la largeur d'une cellule.
        // Si je veux un carré de X cellules de coté il faut que la largeur de la
        // gameboard soit de X * 25 (25 est la largeur d'une cellule)
        app.gameBoard.style.width = app.cellSize * gridSize + 'px';

        // Etape 1.2 - "Boucler" 8x8 fois
        var nbCellules = gridSize * gridSize;
        for (var indexCell = 0; indexCell < nbCellules; indexCell++) {

            // Etape 1.3 - Dans la boucles générer une cases
            var cell = document.createElement('div');
            cell.classList.add('pixel');
            app.gameBoard.appendChild(cell);

            // B2 - On se sert de app.cellSize pour définir la width et la height
            cell.style.width = app.cellSize + 'px';
            cell.style.height = app.cellSize + 'px';

            // Etape 2.1 : Je veux réagir au clic sur chaque cellule
            cell.addEventListener('click', app.onClickOnPixel);
        }
    },

    onClickOnPixel: function (event) {

        // Etape 2.2 : Une fois le clic fait sur la cellule je veux récupérer la cellule cliqué
        var cell = event.target;


        // Etape 2.3 : Sur cette cellule, s'il n'y a rien je met la classe bg-black
        //             s'il y a la classe je l'enlève
        //
        cell.setAttribute('data-style-name', app.selectedStyle);

        // classList.toggle correspond au comportement suivant :
        // if (cell.classList.contains('bg-black')) {
        //     cell.classList.remove('bg-black');
        // } else {
        //     cell.classList.add('bg-black');
        // }
    },

    onFormSumbit: function (event) {

        // preventDefault() bloque le fonctionnement normal d'un évenement pour ne laisser
        // que le notre
        // Le fonctionnement normal ici de notre formulaire serait de recharger
        // la page, ce qui nous bloquerais. On annule ça grace à cette ligne
        event.preventDefault();


        // Etape 3.3 - Générer une nouvelle grille
        // Etape 3.3.1 - Obtenir la taille de grille souhaité
        var newGridSize = app.gridSizeInput.value;

        // Etape 3.3.2 - Effacer l'ancienne grille

        // app.gameBoard.firstChild pointe vers le premier enfant de gameBoard (une div.pixel quelquonque)
        // En javascipt si une propriété ou une variable vaut autre chose que 0, null, false, undefined
        // alors si on test cette variable dans une condidition, la condition sera validé
        // Donc tant qu'il y a des noeuds dans gameBoard alors firstChild vaudra autre chose que null
        // Le moment ou il n'y aura plus de noeud app.gameBoard.firstChild vaudra null
        // Et on sortira de la boucle
        while (app.gameBoard.firstChild) {
            app.gameBoard.removeChild(app.gameBoard.firstChild);
        }

        // B2 - Avant de dessiner la grille on récupère la nouvelle cellSize
        //      que l'on enregistre dans l'objet
        app.cellSize = app.cellSizeInput.value;

        // Etape 3.3.3 - Dessiner la nouvelle grille à cette taille
        app.drawGrid(newGridSize);
    },

    generateForm: function () {
        // Etape 3.1 - Ajouter dans le DOM le formulaire

        // getElementsByClassName renvoi toujours une liste
        // car on ne sais pas à l'avance s'il y a 0, 1 ou plusieurs éléments avec cette
        // classe
        // C'est pas très pratique, heureusement il existe querySelector et querySelectorAll
        // qui ont 3 gros avantages
        // 1. On sait clairement si on reçoit une liste (présence de all)
        // 2. On l'utilise avec des sélecteur CSS du coup on peut faire des séléctions
        //    précises et puissante
        // 3. On peut l'utiliser sur n'importe quel noeud pas seulement document
        var formNode = document.querySelector('.configuration');

        // Dans mon formulaire je veux ajouter un input et un bouton
        app.gridSizeInput = document.createElement('input');
        app.gridSizeInput.setAttribute('type', 'number');
        app.gridSizeInput.setAttribute('min', '1');
        app.gridSizeInput.value = 8;

        app.gridSizeInput.id = 'grid-size-input';

        formNode.appendChild(app.gridSizeInput);

        // B2 - Dans mon formulaire je veux ajouter un second input
        // Cela ressemble très très fortement à 3
        // Je peux très facilement partir du code existant
        app.cellSizeInput = document.createElement('input');
        app.cellSizeInput.setAttribute('type', 'number');
        app.cellSizeInput.setAttribute('min', '1');
        app.cellSizeInput.value = app.cellSize;

        app.cellSizeInput.id = 'cell-size-input';

        formNode.appendChild(app.cellSizeInput);

        // Cet élément peut être soit un <input> soit un <button> le résultat est le même
        var submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Valider');
        submitButton.classList.add('submit-button');

        formNode.appendChild(submitButton);

        // Détail sur value:
        // L'attribut html value ne sert pas à la même chose que la propriété value d'un noeud
        // en javascript
        //
        // L'attribut value (du HTML) sert à définir une valeur présente au chargement de la page
        // si après coup l'utilisateur modifie cette valeur et que je viens lire l'attribut value
        // j'aurais toujours la valeur du chargement de la page
        //
        // En revanche, l'attribut value de l'objet en JS correspond à la valeur actuelle contenu
        // dans l'input


        // Etape 3.2 - Détecter la soumission du formulaire
        formNode.addEventListener('submit', app.onFormSumbit);
    },

    onClickOnPaletteChoice: function (event) {
        app.selectedStyle = event.target.getAttribute('data-style-name');
        console.log('Selected style :', selectedStyle);
    },

    generatePalette: function () {
        var paletteNode = document.getElementById('palette');

        // En JS les Array dispose d'une méthode spéciale :
        // forEach elle prend en paramètre un callback (qui a lui même un paramètre)
        // Le callback sera appelé pour chaque élément dans la liste
        // et chaque sont paramètre prendra la valeur d'un des éléments
        app.styles.forEach(function (style) {
            var paletteChoiceNode = document.createElement('div');
            paletteChoiceNode.classList.add('palette-choice');
            paletteChoiceNode.setAttribute('data-style-name', style);
            // équivaut à
            // paletteChoiceNode.dataset.styleName = style

            paletteChoiceNode.addEventListener('click', app.onClickOnPaletteChoice);
            paletteNode.appendChild(paletteChoiceNode);
        });
    },

    init: function () {
        app.gameBoard = document.getElementById('invader');
        app.generateForm();
        app.generatePalette();
        app.drawGrid(8);
    }
};

document.addEventListener('DOMContentLoaded', app.init);