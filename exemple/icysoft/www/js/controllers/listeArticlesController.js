'use strict';

angular.module('listeArticlesController', [])
.controller('ListeArtCtrl', function($scope,$state){
  	$scope.article = function(id) {
  		$state.go('blog.article');
  	}
});
