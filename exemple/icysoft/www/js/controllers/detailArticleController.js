'use strict';

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