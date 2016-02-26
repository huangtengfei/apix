angular.module('apix').factory('MockApiService', MockApiService);

MockApiService.$inject = ['$http', 'baseUrl'];

function MockApiService($http) {
    return {
        get: function(url, params, succ, err){
        	$http.get(url, {params: params}).success(succ).error(err);
        },
        post: function(url, params, succ, err){
            $http.post(url, params).success(succ).error(err);
        },
        patch: function(url, params, succ, err){
            $http.patch(url, params).success(succ).error(err);
        },
        remove: function(url, succ, err){
            $http.delete(url).success(succ).error(err);
        }
    }
}
