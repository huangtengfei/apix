angular.module('auth').factory('MockService', MockService);

MockService.$inject = ['$http', 'baseUrl'];

function MockService($http) {
    return {
        getUrl: function(url, params, succ, err){
        	$http.get(url, {params: params}).success(succ).error(err);
        }
    }
}
