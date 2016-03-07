'use strict';

angular.module('listeArticlesController', ['article-service'])
.controller('ListeArtCtrl', function($scope,$state,Articles){
  	$scope.article = function(id) {
  		$state.go('blog.article');
  	}
    $scope.articleList = Articles.getList();
    console.log($scope.articleList);
});
