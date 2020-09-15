# Comment refacto ?

Il est important de bien organiser notre code.

Pour ça on va priligié le regroupement dans des modules.

## 1. La base

Je commence par créé un objet (souvent `app`) qui sera mon module.

## 2. Le fonction

Pour commencer je prend toutes les fonctions que j'ai écrite dans mon code pour les mettres dans mon modules. Je passe de

```javascript
function maFonction(param1) {

}
```

à

```javascript
var app = {
    maFonction: function (param1) {

    }
}
```

Si j'ai de grosse fonction anonyme (dans des callbacks par exemples), c'est le bon moment pour leur trouver un petit nom et les appeler.

:warning: il ne faut pas oublier de préfixer tous les appels à ces fonctions par le nom de mon module :

```javascript
maFonction();
```

devient

```javascript
app.maFonction();
```

## 3. L'init

Il me reste surment un peu de code "en dehors" de toutes fonction. Ce code là je n'hésite pas à le regrouper dans un fonction `init` ou `start`.

Si cette fonction est longue il est surement pertinant de la redécouper en plusieurs petites fonctions. Dans ce je me fis au "sens". J'essais de regrouper les lignes qui ont un objectif / sens commun (par ex. "générer le formulaire").

## 4. Les propriétés partagés

Il y a surement des variables dont j'ai besoin dans plusieurs méthodes et que je recréé à chaque fois (c'est souvent le cas des noeuds dans le DOM).

Cela fait d'excellente propriété pour mon objet.

Je les rajoutes en les initialisants soit à la déclaration soit quand c'est pertinant dans une de mes fonctions.

## 5. Les constantes

Il y a peut être dans mon code des valeurs "littérale" écrite dans des calculs ou passé en argument de fonction. Pour simplifier la maintenance de mon application je vais en faire des constantes : des propriétés de mon objet dont je marquerais le nom en majuscule.