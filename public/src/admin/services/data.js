angular.module('auth').factory('DataService', DataService);

DataService.$inject = ['$http', 'baseUrl'];

function DataService($http) {
    return {
        getSystems: function(succ, err){
            $http.get('/apix/v1/systems').success(succ).error(err);
        },
        getGroups: function(params, succ, err){
        	$http.get('/apix/v1/groups', {params: params}).success(succ).error(err);
        },
        getApis: function(params, succ, err){
        	$http.get('/apix/v1/apis', {params: params}).success(succ).error(err);
        },
        createApi: function(params, succ, err){
            $http.post('/apix/v1/apis', params).success(succ).error(err);
        },
        createGroup: function(params, succ, err){
            $http.post('/apix/v1/groups', params).success(succ).error(err);
        },
        getGroup: function(params, succ, err){
            $http.get('/apix/v1/group', {params: params}).success(succ).error(err);
        },
        getApi: function(params, succ, err){
            $http.get('/apix/v1/api', {params: params}).success(succ).error(err);
        }
    }
}
