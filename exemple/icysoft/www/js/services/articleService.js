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
