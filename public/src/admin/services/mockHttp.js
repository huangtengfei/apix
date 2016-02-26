angular.module('apix').factory('MockHttpService', MockHttpService);

MockHttpService.$inject = ['$http'];

function MockHttpService($http) {
    return {
        get: function(url, params, succ, err){
            $http.get(url, {params: params}).success(succ).error(err);
        },
        post: function(url, params, succ, err){
            $http.post(url, params).success(succ).error(err);
        }
    }
}
