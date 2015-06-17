# Ionic - Partie 2
### I. Aller plus loin avec Ionic
<img src="./img/logo_ionic.png" width="200"/>

Notre [premier article](http://www.icysoft.fr/XXX) sur le framework Ionic, nous a permis de survoler les différents aspect de Ionic, de son installation à la compilation d'une nouvelle application en passant par la création d'une rendu. Dans ce nouvel article nous allons plonger un peu plus dans le détail de ce que nous propose le framework Ionic. Pour cela nous allons reprendre l'application créée dans le premier article et la rendre un peu plus vivante. Le but final est de récupérer les articles de ce blog directement dans notre application de façon dynamique via les API déjà codées pour celui-ci. Nous mettrons pour cela en pratique plusieurs notions tels que le pull-to-refresh ou l'infinite scrolling.

### II. Définition du besoin

Pour commencer nous allons faire quelques petits sketch de ce qu'on veut obtenir. Mettre sur papier ses idées avant de partir tête baissée dans la réalisation peut permettre de nous éviter quelques soucis.

Résumons donc pour cette application, nous avons besoin :
- Une page d'accueil permettant de se rediriger vers le blog
- Une page listant les articles avec un aperçu, chaque article sera cliquable et permettra de se redireger vers la page de détail.
- Un page permettant de visualiser l'article dans sa globalité.

Nous resterons sciemment sur un fonctionnement simple afin de ne pas s'écarter de notre but initial.

Voici ce que donne les sketch de notre application (le logiciel utilisé est [Pencil](http://pencil.evolus.vn/)) :

<img src="./img/ecran1.png" width="200" style="float: left; margin:10px;"/>
<img src="./img/ecran2.png" width="200" style="float: left; margin:10px;"/> <img src="./img/ecran3.png" style="margin:10px;" width="200"/>

### III. La vitrine
### IV. Gestion des API
