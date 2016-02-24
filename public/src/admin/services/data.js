angular.module('auth').factory('DataService', DataService);

DataService.$inject = ['$http', 'baseUrl'];

function DataService($http) {
    return {
        getSystems: function(succ, err){
            $http.get('/api/systems').success(succ).error(err);
        },
        getGroups: function(params, succ, err){
        	$http.get('/api/groups', {params: params}).success(succ).error(err);
        },
        getApis: function(params, succ, err){
        	$http.get('/api/apis', {params: params}).success(succ).error(err);
        },
        createApi: function(params, succ, err){
            $http.post('/api/apis', params).success(succ).error(err);
        },
        createGroup: function(params, succ, err){
            $http.post('/api/groups', params).success(succ).error(err);
        },
        getApi: function(params, succ, err){
            $http.get('/api/api', {params: params}).success(succ).error(err);
        },
    }
}
