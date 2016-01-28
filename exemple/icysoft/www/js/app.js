angular.module('icysoft', ['ionic', 'accueilController', 'detailArticleController', 'listeArticlesController'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'templates/accueil.html',
    controller : 'AccueilCtrl'
  })
  .state('blog', {
    abstact: true,
    url: '/blog'
  })
  .state('blog.list', {
    url: '',
    templateUrl: 'templates/listeArticles.html',
    controller : 'ListeArtCtrl'
  })
  .state('blog.article', {
    url: '/:article',
    templateUrl: 'templates/detailArticle.html',
    controller : 'DetailArtCtrl'
  });

  $urlRouterProvider.otherwise('/');
});
