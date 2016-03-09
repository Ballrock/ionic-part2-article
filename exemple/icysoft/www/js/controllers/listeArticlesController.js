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
