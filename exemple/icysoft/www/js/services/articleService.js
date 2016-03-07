'use strict';
angular.module('article-service', [])

.factory('Articles', function($http) {

  var urls = {
//    list: 'http://www.icysoft.fr/api/articles',
//    article: 'http://www.icysoft.fr/api/articles/%s'
    list: 'http://localhost:8100/api/articles',
    article: 'http://localhost:8100/api/articles/%s'
  };

  return {
    getList: function() {
      return $http.get(urls.list).then(
              function (response) {
                return {
                   title: response.data.title,
                   cost:  response.data.price
                };
              },
              function (httpError) {
                 // translate the error
                 throw httpError.status + " : " +
                       httpError.data;
              });
    }
  };
})
