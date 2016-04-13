<img src="./img/logo_ionic.png" width="200"/>

Notre [premier article](http://blog.rockball.fr/ionic-presentation-partie-1/) sur le framework Ionic nous a permis de survoler les différents aspects de Ionic, de son installation à la compilation d'une nouvelle application en passant par la création d'une rendu. Dans ce nouvel article nous allons plonger un peu plus dans le détail de ce que nous propose le framework. Pour cela nous allons reprendre l'application créée dans le premier article et la rendre un peu plus vivante. Le but final est de récupérer les articles d'un blog directement dans notre application de façon dynamique via les API déjà existantes.

### I. Définition du besoin

Pour commencer nous allons faire quelques petits sketchs de ce qu'on veut obtenir. Mettre sur papier ses idées avant de partir tête baissée dans la réalisation peut permettre de nous éviter quelques soucis.

Résumons donc pour cette application, nous avons besoin :
- Une page d'accueil permettant de se rediriger vers le blog
- Une page listant les articles avec un aperçu, chaque article sera cliquable et permettra de se rediriger vers la page de détail.
- Un page permettant de visualiser l'article dans sa globalité.

Nous resterons sciemment sur un fonctionnement simple afin de ne pas s'écarter de notre but initial.

Voici ce que donne les sketch de notre application :

<img src="./img/ecran1.png" width="200" style="float: left; margin:10px;"/>
<img src="./img/ecran2.png" width="200" style="float: left; margin:10px;"/> <img src="./img/ecran3.png" style="margin:10px;" width="200"/>

Il est à noter que le logiciel utilisé pour la réalisation de rendus ci-dessus est [Pencil](https://github.com/prikhi/pencil/releases).

### II. Mise en place des bases

Nous allons repartir d'une application vierge pour cela, comme nous l'avons vu lors du premier article :

```bash
ionic start icysoft blank
```

À partir de la nous pouvons démarrer le developpement de notre application interactive.

### III. La structure

Plaçons-nous dans le dossier www. Nous avons actuellement la structure suivante :

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
* `accueil.html`
* `listeArticles.html`
* `detailArticle.html`

Du coté JS, j'ai personnellement l'habitude de bien séparer mes controllers Angular pour éviter les confusions de traitement JS et améliorer la maintenabilité de mes applications. Je vais donc appliquer cette doctrine ici.
Créons maintenant nos controllers Angulars dans un dossier *js/controllers/*.
* `accueilController.js`
* `listeArticlesController.js`
* `detailArticleController.js`

Nous n'aurons pas besoin d'énormement de styles CSS, une seule feuille de style conviendra donc parfaitement à nos besoins. Pas de modification de ce coté là.

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
  │   │   └───detailArticleController.js
  │   └───app.js
  ├───lib
  │   └───ionic
  ├───templates
  │   ├───abstractArticle.html
  │   ├───accueil.html
  │   ├───listeArticles.html
  │   └───detailArticle.html
  └───index.html
```
C'est joli tout plein ! Oui enfin bon sans aucun contenu nous n'allons pas aller bien loin. Les sous-parties suivantes vont donc décrire étape par étape la complétion de ces fichiers.

### IV. Le contenu "statique"

#### 1. [`controllers.js`] Il faut bien commencer quelque part (Initialisation des controllers AngularJS)

Rien de bien compliqué ici, nous allons juste initialiser nos controllers AngularJS pour pouvoir les appeler depuis notre module principal `app.js`. Pour cela modifions les fichiers suivants pour qu'ils ressemblent au code ci-dessous :
```js
'use strict';

angular.module('accueilController', [])
.controller('AccueilCtrl', function(){
});
```
* `accueilController.js`
* `listeArticlesController.js`
* `detailArticleController.js`

On initialise juste des controllers vides. Nous les remplirons plus tard.

#### 2. [`app.js` & `index.html`] Mais où est-ce qu'on va ? (Routes et Redirections)
J'ai abordé très vite cette partie dans l'article 1 qui n'avait pour but que de présenter quelques bases sans approfondissement. Cette partie a donc pour but d'approfondir ce point.
Pour naviguer dans un site internet ou meme dans la vie de tout les jours il est important de savoir ou est-ce que l'on va, que ce soit en cliquant sur un lien ou à un embranchement de route. Dans une application ionic c'est un peu pareil sauf que pour concerver l'état de l'application d'une page à l'autre on utilise un router et, plus precisement `angular-ui-router`. Ce router va définir pour chaque embranchement ou url dans notre cas, le template et/ou le controller à utiliser. Ce qui vous me l'accorderez corresponds pas mal à ce que nous avons initialisé juste au-dessus... De la à dire que je l'ai fait exprès :p

##### a. [`index.html`]
Occupons nous tout d'abord du fichier index.html. Ce dernier apportera le support à tous les templates. C'est le layout de base dans lequel sera inclus nos templates. Nous allons déjà voir ce que celui-ci contient suite à l'init de projet avec le starter blank.
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title></title>

    <link href="lib/ionic/css/ionic.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <!-- IF using Sass (run gulp sass first), then uncomment below and remove the CSS includes above
    <link href="css/ionic.app.css" rel="stylesheet">
    -->

    <!-- ionic/angularjs js -->
    <script src="lib/ionic/js/ionic.bundle.js"></script>

    <!-- cordova script (this will be a 404 during development) -->
    <script src="cordova.js"></script>

    <!-- your app's js -->
    <script src="js/app.js"></script>
  </head>
  <body ng-app="starter">

    <ion-pane>
      <ion-header-bar class="bar-stable">
        <h1 class="title">Ionic Blank Starter</h1>
      </ion-header-bar>
      <ion-content>
      </ion-content>
    </ion-pane>
  </body>
</html>
```

Tout d'abord les inclusions CSS. l'on peut voir tout d'abord les fichier `ionic.css` et `style.css`. Le premier correspond à la feuille de style ionic comprenant tous les composants, tandis que le second correspond à la feuille de style de notre application. L'inclusion CSS commenté est présente dans le cas de l'utilisation de Sass pour modifier la feuille de style ionic.
> Si vous ne connaissez pas [Sass](http://sass-lang.com/) je ne peux que vous conseiller de vous renseigner sur le sujet.
Cependant le cas présent cela ne nous sera pas utile nous pouvons donc dès à présent supprimer cette partie de notre code.

Du coté des inclusions JavaScript nous avons `ionic.bundle.js`, `cordova.js` et notre `app.js`. Le premier est le fichier js de ionic comprenant la charge utile de tous ces composants, le second, qui ne sera d'ailleur pas fonctionnel en développement (en mode Desktop en tout cas), comprend tout le coeur de Cordova sur lequel comme vous devez maintenant surement le savoir, repose Ionic. Pourquoi n'est-il pas accessible en développement me direz-vous ? Eh bien il comprend tout le métier qui communiquera avec le téléphone et réalisera le lien entre les fonctionnalités natives du téléphone et notre code JS. Ce fichier ne peut donc fonctionner sur Desktop et est OS-dépendant. Ce fichier est uniquement ajouté au package lors de la compilation pour l'OS Cible.
Le dernier fichier est `app.js`, c'est le point d'entrée js de notre application.
Nous pouvons également dès à present ajouter nos controllers aux inclusions cela nous evitera de revenir modifier le fichier plus tard.
```html
<script src="js/controllers/accueilController.js"></script>
<script src="js/controllers/listeArticlesController.js"></script>
<script src="js/controllers/detailArticleController.js"></script>
```

Passons maintenant à la partie HTML et balises Ionic. Renommons notre app (nous le ferons également du coté de l'`app.js`) puis passont au balises Ionic. Pour permettre la navigation par template et par routes il nous faut intégrer un composant Ionic nommé *ion-nav-view*... et c'est tout :)

Ce qui devrait vous donner quelque chose qui ressemble à ça :
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title></title>
    <!-- Styles -->
    <link href="css/style.css" rel="stylesheet">
    <!-- Frameworks -->
    <link href="lib/ionic/css/ionic.css" rel="stylesheet">
    <script src="lib/ionic/js/ionic.bundle.js"></script>
    <script src="cordova.js"></script>
    <!-- Application et Controllers -->
    <script src="js/app.js"></script>
    <script src="js/controllers/accueilController.js"></script>
    <script src="js/controllers/listeArticlesController.js"></script>
    <script src="js/controllers/detailArticleController.js"></script>
  </head>
  <body ng-app="icysoft">
    <ion-nav-view></ion-nav-view>
  </body>
</html>
```

##### b. [`app.js`]
Au tour de `app.js` de passer à la casserole c'est ici qu'on aura notre gestion de route pour l'application, il appelera également tous nos controllers.

```js
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
```
Si vous n'êtes pas familiarisé à Angular et Javascript (callback notamment), cela peut faire un peu peur. Ne vous inquietez pas, nous allons décomposer cela pas à pas :
```js
angular.module('starter', ['ionic'])
```
Le module starter (que l'on renommera) inclus une dependance à `ionic`. Ce dernier contenu dans le fichier js Ionic que nous avons inclus dans notre index.html. Il contient toutes les methodes et outils de ionic.
```js
.run(function($ionicPlatform) {
```
Juste en dessous, la méthode run est utilisée, celle-ci permet d'exécuter du code une fois que le module a chargé toutes ces dépendances (ici Ionic donc). On passe à `run` une fonction de callback qui sera appelé une fois cette tache réalisée. Ici celle-ci prend en paramètre `$ionicPlatform` qui est une abstraction Angular pour l'utilitaire `ionic.Plateform`.
```js
$ionicPlatform.ready(function() {
```
La méthode `ready` de `$ionicPlatform` est ensuite appelée, son fonctionnement est identique au `run` du module angular, on lui passe une fonction de callback qui sera appelée une fois le traitement fait. Il est à noter que d'une manière générale le fonctionnement par callback est très répandu en JavaScript.
```js
if(window.cordova && window.cordova.plugins.Keyboard) {
	// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	// for form inputs)
	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

	// Don't remove this line unless you know what you are doing. It stops the viewport
	// from snapping when text inputs are focused. Ionic handles this internally for
	// a much nicer keyboard experience.
	cordova.plugins.Keyboard.disableScroll(true);
}
if(window.StatusBar) {
	StatusBar.styleDefault();
}
```
Vous vous souvenez que je vous ai parlé dans le point précédent du fichier `cordova.js`, celui-ci est injecté dans notre application et sert de pont de communication avec les fonctions natives du téléphone.
Ici on verifie que ce fichier est bien injecté (ainsi que son plugin Keyboard) avant d'executer les commmandes. Ainsi, si vous avez bien suivi, comme cordova.js n'est pas chargé dans un mode Desktop, ces conditions ne sont pas remplies dans ce mode-ci. Pour finir, quelques modifications sont appliquées (expliquée dans les commentaires) au clavier natif.
StatutBar est également un [plugin Cordova](https://github.com/apache/cordova-plugin-statusbar) ici il permet d'appliquer le style part defaut (texte sombre pour les fond lumineux).

Et c'est tout.

Maintenant que l'on a compris le fonctionnement de ce fichier nous allons demarrer les modifications.

Nous allons d'abord renommer notre module angular puis integrer `angular-ui-router`
```js
angular.module('icysoft', ['ionic'])
```

Pour `angular-ui-router` nous allons initialiser les différentes routes et états de notre application. Chaque écran sera représentée par une url spécifique, c'est grâce à cet URL que notre router saura quel template afficher et avec quel controller AngularJS. Nous avons uniquement 3 écrans dans notre application, nous pouvons donc résumer toutes ces routes sous la forme du tableau suivant :

| Ecran              | URL            | Variable | Template           | Controller         |
| :----------------- | :------------- | :------- | :----------------- | :----------------- |
| Accueil            | /              |          | accueil.html       | AccueilCtrl        |
| Liste des articles | /blog/         |          | listeArticles.html | ListeArticlesCtrl  |
| Article            | /blog/:article | :article | detailArticle.html | DetailArticleCtrl |

On peut voir que l'URL d'accès aux articles sera différentes selon l'article, ce qui est somme toute relativement logique :D

Implémentons à présent ce comportement dans notre `app.js` :

```js
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    views: {
      'content': {
        templateUrl: 'templates/accueil.html',
        controller : 'AccueilCtrl'
      }
    }
  })
  .state('blog', {
    abstact: true,
    url: '/blog',
    views: {
      'content': {
        templateUrl: "templates/abstractArticle.html"
      }
    }
  })
  .state('blog.list', {
    url: '',
    views: {
      'blog': {
        templateUrl: "templates/listeArticles.html",
        controller: 'ListeArtCtrl'
      }
    }
  })
  .state('blog.article', {
    url: '/:article',
    views: {
      'blog': {
        templateUrl: "templates/detailArticle.html",
        controller: 'DetailArtCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
});
```

On peut voir tout les elements des tableaux dans ce code. Les seuls élements spéciaux sont l'abstract et le otherwise.

```js
.state('blog', {
  abstact: true,
  url: '/blog',
  views: {
    'content': {
      templateUrl: "templates/abstractArticle.html"
    }
  }
})
```
L'abstract correspond à la création d'une route abstraite qui permet de créer aisement un systeme "d'héritage" sur les routes. Ici par exemple j'ai ajouté un temlate pour qu'il soit affiché chez tous ces fils et qui correspondra au header. Il est positionné sur l'url `/blog`. Ensuite je definis une route blog.list qui correspond à l'url vide (donc `/blog`) et un blog.articles qui correspond à l'url `/:article` donc (`/blog/:article`).

```js
$urlRouterProvider.otherwise('/');
```
Dans tous les autres cas on redirige vers / donc l'accueil.

Voila avec cela on devrait pouvoir facilement trouver notre chemin ;)

##### c. En savoir plus
Vous pouvez trouvez plus d'informations sur le routing avec `angular-ui-router` et ionic sur les liens suivants :
* [Wiki Angular-ui-router](https://github.com/angular-ui/ui-router/wiki)
* [Formula sur les Routes de Ionic - partie 1](http://learn.ionicframework.com/formulas/navigation-and-routing-part-1/)
* [Formula sur les Routes de Ionic - partie 2](http://learn.ionicframework.com/formulas/navigation-and-routing-part-2/)

#### 2. [`accueilController.js` & `accueil.html`] Bienvenue mesdames & messieurs ! (Gestion de l'accueil)

##### a. [`accueil.html`]

Vous avez pu le voir dans la partie Définition du besoin, l'accueil de notre application est assez simple :
* Un fond de couleur
* Un logo
* Deux boutons (dont un inactif)

Petit rappel de notre écran :

<img src="./img/ecran1.png" width="200" />

Pour réaliser cela nous allons bien sur utiliser les composants Ionic mais également le system de flexbox CSS3 qui va grandement nous aider pour disposer joliment nos éléments.
> Flexbox étant un outil très pratique CSS3 je vous recommande chaudement de vous renseigner dessus :
> * [Article AlsaCreation](http://www.alsacreations.com/tuto/lire/1493-css3-flexbox-layout-module.html)
> * [Outils de génération Flexbox](http://the-echoplex.net/flexyboxes/)

Voici l'état de mon template `accueil.html` après implémentation :
```html
<ion-view view-title="Icysoft">
	<style>
	</style>
	<ion-content class="Background" overflow-scroll="true">
		<div class="Logo">
		</div>
		<div class="SubBox">
			<button class="SubBox-item-center button button-large button-positive">Apps</button>
			<button class="SubBox-item-center button button-large button-positive" ng-click="blog()">Blog</button>
		</div>
	</ion-content>
</ion-view>
```
Ici on place uniquement notre `div` avec notre logo et notre `div` de boutons. Ces derniers utilisent des composants Ionic et le bouton Blog est lié à la fonction `blog()` de notre controller via la directive `ng-click`.

```css
/* Content */
.Background {
	background-color: #22AAFF;
	display: flex;
	webkit-display:flex;
	moz-display:flex;
	width:100%;
}

.Logo {
  width: 100%;
	height: 80%;
  background-image: url(../img/logo.png);
  background-size: 75%;
  background-repeat: no-repeat;
  background-position: center;
}

.SubBox {
	display: flex;
	justify-content: space-around;
}

::-webkit-scrollbar,
*::-webkit-scrollbar {
	display: none;
}
```

Quelques éléments intérressants ici :
- Un petit trick CSS Ionic pour supprimer la scrollbar avec overflow-scroll=true.
- Le flebox pour l'alignement réparti des boutons (que je trouve, personnellement, très bien fait et facile à réaliser en flexbox)
- La taille de notre logo qui s'ajustera à la taille de l'écran.

##### b. [`accueilController.js`]

Ce controller ne va pas être très rempli il nous permettra juste de réaliser les transitions avec les écrans suivants. Mais pourquoi utiliser un controller alors qu'on pourrait juste faire un lien vers l'écran suivant ? Justement pour permettre de gérer en Javascript tous les éléments complémentaires dont nous pourrions avoir besoin (exemple : Publicité, Analytics, Stockage de session, etc...)

En l'occurence ici notre controller ressemblera à quelque chose comme cela :
```js
angular.module('accueilController', [])
.controller('AccueilCtrl', function($scope,$state){
  $scope.blog = function() {
    $state.go('blog.list');
  }
});
```
On inclue les [scopes](https://docs.angularjs.org/guide/scope) `$scope` et `$state` qui vont respectivement nous permettre définir nos fonctions dans le scope du controller et d'accéder au scope de routes et états pour pouvoir alterer celui-ci (changer de page).
`$state.go` permet donc de changer l'état de l'application. (avec en prime une jolie transition :D)

#### 3. [`abstractArticle.html`] Abstrait toi même ! (Gestion du template abstrait de notre application)

Ce template va uniquement nous servir ici de header pour nos pages `listeArticles` et `detailArticle`. Nous allons simplement définir le theme de la bar de navigation ainsi qu'un petit bouton magique de "back" qui s'accorde automatiquement avec angular-ui-router pour réaliser un retour arriere cohérent dans notre application.

```html
<ion-nav-bar class="bar-positive">
     <ion-nav-back-button>
     </ion-nav-back-button>
</ion-nav-bar>
<ion-nav-view name="blog"></ion-nav-view>
```
Comme on peut le voir, ce n'est pas grand chose. On définit la bar de navigation via la directive `ion-nav-bar` de Ionic, la class `bar-positive` définit uniquement le jeu de couleur utilisé. La directive `ion-nav-back-button` définit quant à elle le bouton de retour, ni plus ni moins. Une fois la barre de navigation créée, on ajoute juste la ion-nav-view pour que les autres templates soient injectés dedans.

#### 4. [`listeArticlesController.js` & `listeArticles.html`] Des articles par milliers (Gestion de la liste d'articles)

##### a. [`listeArticles.html`]

Ici nous allons implémenter un composant Ionic de type liste pour afficher nos articles, dans un premier temps, cette page, cette page ne sera pas intéractive, et présentera seulement un liste d'article en dur.

```html
<ion-view view-title="Blog">
	<ion-content class="padding">
		<div class="list">
			<a class="item item-thumbnail-left" href="#" ng-click="article('test')">
				 <img ng-src="./img/ionic.png" />
				<h2>Article 1</h2>
				<h4>Ceci est le resumé d'un article très intéressant et fort instructif, j'ai nommé Article 1</h4>
			</a>
			[...]
			<a class="item item-thumbnail-left" href="#" ng-click="article('test')">
				 <img ng-src="./img/ionic.png" />
				<h2>Article X</h2>
				<h4>Ceci est le resumé d'un article très intéressant et fort instructif, j'ai nommé Article X</h4>
			</a>
		</div>
	</ion-content>
</ion-view>
```

Le seul point à retenir ici est le ng-click qui va rediriger vers une méthode similaire à ce que l'on a pu voir précedement.

##### b. [`listeArticlesController.js`]

Il reste une méthode à implementer, pour l'instant, de la a même maniere qu'elle a pu l'être dans le précédent controller. À savoir :
```js
'use strict';

angular.module('listeArticlesController', [])
.controller('ListeArtCtrl', function($scope,$state){
  	$scope.article = function(id) {
  		$state.go('blog.article');
  	}
});
```

#### 5. [`detailArticle.html`] Il est frais, il est beau, mon article ! (Affichage d'un article)

##### a. [`detailArticle.html`]

J'ai utilisé ici, pour changer, le système de Flexbox integré directement dans Ionic via les classes CSS `row` et `col`, je vous invite à aller voir la description du [système de grille](http://learn.ionicframework.com/formulas/using-the-grid/).

On obtient quelque chose resemblant à cela :

```html
<ion-view view-title="Article Test">
  <ion-content class="padding">
    <div class="row">
      <div>
        <img ng-src="./img/ionic.png" style="width:90px;"/>
      </div>
      <div style="margin:10px;">
        <h2>Article Test</h2>
        <h5>Antoine Précigout - 01/01/1970</h5>
      </div>
    </div>
    <div class="col">
      <p>
        Lorem ipsum dolor sit amet, [...] laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, [...] laborum.
      </p>
    </div>
  </ion-content>
</ion-view>
```   

Toujours dans une optique statique. Nous dynamiserons tout ca dans le chapitre suivant.

#### 6. Conclusion

Nous avons pu aborder dans ce chapitre tous les éléments structurels nous permettant de créer une application basique et statique. Plus important encore nous pouvons naviguer facilement entre les pages et garder un worflow cohérent avec `angular-ui-router`, ce qui nous permet de faire de `back` entre les pages automatiquement.

### V. L'interactivité

##### 1. [`articleService.js`] À votre service ! (Création du service de requetage d'API)

Vous l'avez compris, j'aime bien structurer (à outrance ?) mes projets Ionic pour faciliter leurs maintenabilités. Pour débuter cette partie sur l'interactivité nous allons démarrer par l'initialisation du module et du service qui nous servira à requéter notre très chère API d'articles. Pour cela nous allons créer une factory angular qui sera appelée dans nos différents controllers.

On place ce fichier dans un dossier service :
```bash
www
  ├───...
  └───js
      ├───controllers
      └───service
          └───articleService.js
```

Il faudra bien sûr inclure celui-ci dans le fichier `index.html`.

```js
'use strict';
angular.module('article-service', [])
.factory('Articles', function($http) {

  var urls = {
    list: 'http://www.icysoft.fr/api/articles',
    article: 'http://www.icysoft.fr/api/articles/%s'
  };
  
  var replaceUrl = function(url, string){
    return url.replace("%s", string);  
  };

  return {
    getList: function() {
        return $http.get(urls.list).then(
            function (response) {
                return response.data.articles;
            },
            function (httpError) {
                throw httpError.status + " : " +
                    httpError.data;
            });
    },
    getArticle: function(id) {
        return $http.get(replaceUrl(urls.article, id)).then(
            function (response) {
                return response.data;
            },
            function (httpError) {
                throw httpError.status + " : " +
                    httpError.data;
            });
    },
    simpleId:  function(uid) {
        return uid.split(":")[1];
    }
  };
})
```

Mais voyons plutôt ça point par point.

```js
angular.module('article-service', [])
.factory('Articles', function($http)
```
Ici on initialise le module (ma manie de toujours tout diviser ^^) auquel on associe une [factory](https://docs.angularjs.org/guide/services). `$http` correspond au service HTTP d'angular, il nous permettra de réaliser les appels à l'API via la méthode `get`.

```js
var urls = {
    list: 'http://www.icysoft.fr/api/articles',
    article: 'http://www.icysoft.fr/api/articles/%s'
};

var replaceUrl = function(url, string){
    return url.replace("%s", string);  
};
```
Définition des deux URL, l'un pointe vers l'API permettant de récupérer tous les articles, l'autre vers l'API permettant de récuperer un article en particulier. Le ``%s` sera remplacé dans la méthode `replaceUrl` par le numéro de l'article à consulter.

```js
return {
    getList: function() {
        return $http.get(urls.list).then(
            function (response) {
                return response.data.articles;
            },
            function (httpError) {
                throw httpError.status + " : " +
                    httpError.data;
            });
    },
    getArticle: function(id) {
        return $http.get(replaceUrl(urls.article, id)).then(
            function (response) {
                return response.data;
            },
            function (httpError) {
                throw httpError.status + " : " +
                    httpError.data;
            });
    },
    simpleId:  function(uid) {
        return uid.split(":")[1];
    }
};
```
Le service `$http` utilisant des [promesses](https://docs.angularjs.org/api/ng/service/$q), comme les promesses, cela peut être un peu perturbant au premier abord, mais ne vous inquietez pas. Le principe repose sur la manipulation d'un objet qui est la promesse d'une valeur futur (très pratique dans le cas d'un appel asynchrone vous ne trouvez pas ?) Cela nous permet de directement travailler avec cette promesse avant que l'appel soit terminé. Et la plupart du temps, ce n'est pas beaucoup plus compliqué que ça en fait :). On se contente d'appeler la méthode `then(success,fail)` pour définir le comportement lorsque la promesse sera réalisée.
Ainsi, ici, lorsque l'appel est correctement réalisé pour `getArticle` et `getList` on retourne la réponse HTTP (dans notre cas un object JSON). Le seul traitement réalisé ici est pour simplifier le traitement de la données hors du service par la suite.
La méthode `simpleId` est une petite méthode utilitaire que nous utiliserons pour récupérer l'id de l'article depuis la liste.

Pour finir vous avez surement remarqué que les méthodes `getArticle`, `getList`, `simpleId` et `replaceUrl` ne sont pas définis avec de la même façon. Dans le cas de `replaceUrl` il s'agit d'une méthode interne qui ne pourra pas être appeler via `Articles.X()` dans le controller, contrairement aux autres.

##### 2. [`detailArticleControllers.js` && `listeArticlesController.js`] Vous avez le controle (Modification des controllers pour l'interactivité)

Coté controller le but va être de récupérer les informations du service puis de les injecter dans le modèle et par conséquent dans notre template. On n'oubliera pas d'ajouter un petit filtre pour éviter les appels multiples inutiles à l'API à chaque execution de la méthode dans le service.

###### a. [`listeArticlesController.js`]

Dans ce controller, nous allons récupérer et attribuer les données de l'API qui liste les articles disponibles.
```js
'use strict';
angular.module('listeArticlesController', ['article-service'])
.controller('ListeArtCtrl', function($scope,Articles){
    $scope.requestArticleList = function() {
        Articles.getList().then(function(data) {
            $scope.articleList = data;
            $scope.requested = true;
        }); 
    }
    $scope.simpleId = function(uid) {
        return Articles.simpleId(uid);
    }
    
    if ($scope.requested != true) {
        $scope.requestArticleList();
    }   
});
```
On voit que le controller reste très petit.

```js
$scope.requestArticleList = function() {
    Articles.getList().then(function(data) {
        $scope.articleList = data;
        $scope.requested = true;
    }); 
}
$scope.simpleId = function(uid) {
    return Articles.simpleId(uid);
}
```
Deux fonctions sont définis dans le scope ici `requestArticleList` et `simpleId`, nous allons nous interresser à la première sachant que la seconde est uniquement un appel à la méthode identique du service. 
`requestArticleList` appelle la promesse via la méthode `getList` du service Articles. On appelle ensuite la méthode `then` pour résoudre la promesse. Dans cette méthode j'ai choisi de définir un attribut du scope pour les données recupérées et un booléen pour éviter les appels multiples à l'API.
`articleList` sera appelé dans notre template via des directives AngularJS.

###### b. [`detailArticleControllers.js`]
On suit le même principe que précédemment ici, la principale différence se situe uniquement dans la méthode appelée par le service.

```js
angular.module('detailArticleController', [])
.controller('DetailArtCtrl', function($scope, $stateParams, Articles){
    console.log($stateParams);
    $scope.requestArticle = function() {
        Articles.getArticle($stateParams.article).then(function(data) {
            $scope.article = data;
            $scope.requested = true;
            console.log($scope.article);
        }); 
    }
    if ($scope.requested != true) {
        $scope.requestArticle();
    }   
});
```

Les plus attentifs remarqueront l'absences des méthodes de changement en effet, celles-ci ont été supprimé au profit de directive directement définit dans les templates. Nous verrons ce point dans la prochaine partie.

##### 3. [`detailArticle.html` && `listeArticles.html`] Il est vivant ! (Modification des templates pour l'interactivité)

Vous allez voir que beaucoup de choses ont été simplifiées dans cette partie, la structure des pages (sur les images) ont été revues pour coller aux informations disponibles dans l'API.

###### a. [`listeArticles.html`]

```html
<ion-view view-title="Blog">
	<ion-content class="padding">
		<div class="list">
			<a ng-repeat="article in articleList" class="item" 
             href="#" ui-sref="blog.article({article: simpleId(article.uid)})">
				<!--<img ng-src="./img/ionic.png" />-->
				<h2>{{article.title}}</h2>
				<h3>{{article.summary}}</h3>
                <h4>Date de parution : {{article.meta.releaseDate | date:'dd-MM-yyyy HH:mm:ss'}}</h4>
			</a>
		</div>
	</ion-content>
</ion-view>
```

C'est vachement plus joli non ? Voyons quelques point :

```html
<a ng-repeat="article in articleList" [...]
```
Il s'agit ici de la directive `repeat` de Angular qui permet de parcourir un tableau d'informations et de répéter le code HTML fils autant de fois que de valeur présente dans ce tableau. On définit la variable `article` qui correspondra à un élément de notre tableau.

```html
 ui-sref="blog.article({article: simpleId(article.uid)})">
```
C'est ce dont je vous parlais à l'instant, c'est ce qui remplace avantageusement notre méthode de changement d'emplacement précédent (`ng-click`). On defini donc ici ce qui sera passé en valeur pour article dans la route de détail d'article. On appel `simpleId` pour transformer l'uid au format article:X en X.

```html
<h2>{{article.title}}</h2>
<h3>{{article.summary}}</h3>
<h4>Date de parution : {{article.meta.releaseDate | date:'dd-MM-yyyy HH:mm:ss'}}</h4>
```
C'est de cette facon que l'on appelle les valeurs des données contenues dans chaque `article` de `articleList`. Une petite spécificité pour la date de parution de l'article qui utilise un filtre standard AngularJS pour représenter la Date (initialement TimeStamp dans les données) dans le format voulu.

Et c'est tout !

###### b. [`detailArticle.html`]
```html
<ion-view view-title="{{article.title}}">
  <ion-content class="padding">
    <div>
        <h2>{{article.title}}</h2>
        <h5>{{article.meta.releaseDate | date:'dd-MM-yyyy HH:mm:ss'}}</h5>
    </div>
    <div ng-bind-html="article.bodyHTML">
    </div>
  </ion-content>
</ion-view>
```

On reprend exactement le meme principe que pour la liste d'article sauf que cette fois, nul besoin de ng-repeat, la donnée étant unique. la petite spécifité est sur l'utilisation de la directive `ng-bind-html`. Cette dernière nous permet ici d'interpreter le HTML qui nous est renvoyé par l'API directement à l'interieur de cette DIV

###### c. CORS de guerre

Et la viens le moment fatidique ou vous testez sur votre envirronement local via un `ionic serve` et que ca ne marche PAS !

Dans le cas ou vous obtenez une erreur du style :
```bash
XMLHttpRequest cannot load http://www.icysoft.fr/api/articles. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8100' is therefore not allowed access.
```

Il s'agit d'un problème typique de CORS, le serveur distant et votre navigateur n'autorise pas l'appel à une ressource sur un autre nom de domaine que celui d'où l'appel émane. Je vous conseille de lire [ce très bon article]() de Ionic sur le sujet qui vous propose également des solutions pour palier à cela. À savoir que ce problème ne se produira que sur votre navigateur en test, l'application déployée sur un téléphone fonctionnera car non sujette aux regles CORS.
 
### VI. Aller plus loin

Et voila, après un peu d'effort nous avons une application interactive :

<img src="./img/final.gif" />

Vous remarquerais que je n'ai pas fait trop d'effort sur le formatage du HTML des articles, ce point n'étant pas vraiement le but de ce tuto :p Les sources de l'application ainsi que le MarkDown de l'articles sont disponible sur mon [GitHub](https://github.com/Ballrock/ionic-presentation-part2). N'hésitez pas à faire des PR si le coeur vous en dit :)

Pour finir, il est bien sur possible d'aller beaucoup plus loin en intégrant par exemple un système de "pull to refresh" pour mettre à jour la liste, un test de connexion où même une interactivuté avec des likes ou des commentaires. Cela peut aller aussi loin que votre imagination.

J'espère que cet article aura su vous aider dans votre approche de Ionic, je vous souhaite un bon developpement et vous dit à une prochaine pour d'autre articles :)
