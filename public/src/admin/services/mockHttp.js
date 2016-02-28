angular.module('apix').factory('MockHttpService', MockHttpService);

MockHttpService.$inject = ['$http', 'baseUrl'];

function MockHttpService($http) {
    return {
        get: function(url, params, succ, err){
        	$http.get(url, {params: params}).success(succ).error(err);
        },
        post: function(url, data, succ, err){
            $http.post(url, data).success(succ).error(err);
        },
        patch: function(url, params, data, succ, err){
            $http.patch(url, data, {params: params}).success(succ).error(err);
        },
        remove: function(url, params, succ, err){
            $http.delete(url, {params: params}).success(succ).error(err);
        }
    }
}
