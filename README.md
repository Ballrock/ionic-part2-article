<img src="./img/logo_ionic.png" width="200"/>

Notre [premier article](http://blog.rockball.fr/ionic-presentation-partie-1/) sur le framework Ionic, nous a permis de survoler les différents aspect de Ionic, de son installation à la compilation d'une nouvelle application en passant par la création d'une rendu. Dans ce nouvel article nous allons plonger un peu plus dans le détail de ce que nous propose le framework Ionic. Pour cela nous allons reprendre l'application créée dans le premier article et la rendre un peu plus vivante. Le but final est de récupérer les articles de ce blog directement dans notre application de façon dynamique via les API déjà codées pour celui-ci. Nous mettrons pour cela en pratique plusieurs notions tels que le pull-to-refresh ou l'infinite scrolling.

### I. Définition du besoin

Pour commencer nous allons faire quelques petits sketch de ce qu'on veut obtenir. Mettre sur papier ses idées avant de partir tête baissée dans la réalisation peut permettre de nous éviter quelques soucis.

Résumons donc pour cette application, nous avons besoin :
- Une page d'accueil permettant de se rediriger vers le blog
- Une page listant les articles avec un aperçu, chaque article sera cliquable et permettra de se redireger vers la page de détail.
- Un page permettant de visualiser l'article dans sa globalité.

Nous resterons sciemment sur un fonctionnement simple afin de ne pas s'écarter de notre but initial.

Voici ce que donne les sketch de notre application : 

<img src="./img/ecran1.png" width="200" style="float: left; margin:10px;"/>
<img src="./img/ecran2.png" width="200" style="float: left; margin:10px;"/> <img src="./img/ecran3.png" style="margin:10px;" width="200"/>

Il est à noter que le logiciel utilisé pour la réalisation de rendus ci-dessus est [Pencil](https://github.com/prikhi/pencil/releases).

### II. Mise en place des bases

Nous allons repartir d'une appplication vierge pour cela, comme nous l'avons vu lors du premier article :

```bash
ionic start icysoft blank
```

À partir de la nous pouvons demarrer le developpement de notre application interactive.

### III. La structure

Plaçons-nous dans le dossier www. Nous avons actuellement la structure suivante

```bash
www
  ├───css
  │   └───style.css
  ├───img
  ├───js
  │   └───app.js
  ├───lib
  │   └───ionic
  └───index.html
```

Comme vu plus haut nous aurons 3 pages principales, je propose donc dès à present d'ajouter un nouveau dossier *templates* qui contiendra nos templates de page qui seront remplis dynamiquement avec Angular.
Créons donc tout de suite les fichiers :
* accueil.html
* listeArticles.html
* detailArticles.html 
Du coté JS, j'ai personnelement l'habitude de bien séparer mes controllers angular pour eviter les confusions de traitement Javascript et améliorer la maintenabilité de mes applications. Je vais donc appliquer cette doctrine ici.
Créons maintenant nos controllers Angulars dans un dossier *js/controllers/. 
* accueilController.js
* listeArticlesController.js
* detailArticlesController.js
Nous n'aurons pas besoin d'enormement de styles CSS, une seule feuille de style conviendra donc parfaitement à nos besoins. Pas de modification de ce coté là.

Voici notre arborescence de projet :
```bash
www
  ├───css
  │   └───style.css
  ├───img
  ├───js
  │   ├───controllers
  │   │   ├───accueilController.js
  │   │   ├───listeArticlesController.js
  │   │   └───detailArticlesController.js
  │   └───app.js
  ├───lib
  │   └───ionic
  ├───templates
  │   ├───accueil.html
  │   ├───listeArticles.html
  │   └───detailArticles.html
  └───index.html
```
C'est joli tout plein ! Oui enfin bon sans aucun contenu nous n'allons pas aller bien loin. Les sous-parties suivantes vont donc décrire étape par étape la complétion de ces fichiers.

#### a. [app.js & index.html] Mais où est-ce qu'on va ? (Routes et Redirections)
Pour naviguer dans un site internet ou meme dans la vie de tout les jours il est important de savoir ou est-ce que l'on va, que ce soit en cliquant sur un lien ou à un embranchement de route. Dans une application ionic c'est un peu pareil sauf que pour concerver l'état de l'application d'une page à l'autre on utilise un router et, plus precisement *angular-ui-router*. Ce router va definir pour chaque embranchement ou url dans notre cas, le template ou le controller à utiliser. Ce qui vous me l'accorderez corresponds pas mal à ce que nous avons initialisé juste au dessus... De la à dire que je l'ai fait exprès :p




Voila pour cette partie, vous pouvez trouvez plus d'informations sur le routing avec angular-ui-router et ionic sur les liens suivants :
* [Wiki Angular-ui-router](https://github.com/angular-ui/ui-router/wiki)
* [Formula sur les Routes de Ionic - partie 1](http://learn.ionicframework.com/formulas/navigation-and-routing-part-1/)
* [Formula sur les Routes de Ionic - partie 2](http://learn.ionicframework.com/formulas/navigation-and-routing-part-2/)

### IV. L'interactivité

Note use service & factory