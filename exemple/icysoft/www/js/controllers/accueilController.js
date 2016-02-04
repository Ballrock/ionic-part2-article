'use strict';

angular.module('accueilController', [])
.controller('AccueilCtrl', function($scope,$state){
	$scope.blog = function() {
		$state.go('blog.list');
	}
});