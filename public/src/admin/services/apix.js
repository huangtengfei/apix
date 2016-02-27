angular.module('apix').factory('ApixService', ApixService);

ApixService.$inject = ['$http', 'baseUrl'];

function ApixService($http) {

    return {

        getSystems: function(succ, err){
            $http.get('/apix/v1/systems').success(succ).error(err);
        },
        createSystem: function(params, succ, err){
            $http.post('/apix/v1/systems', params).success(succ).error(err);
        },

        getGroups: function(params, succ, err){
        	$http.get('/apix/v1/groups', {params: params}).success(succ).error(err);
        },
        createGroup: function(params, succ, err){
            $http.post('/apix/v1/groups', params).success(succ).error(err);
        },
        getGroup: function(params, succ, err){
            $http.get('/apix/v1/group', {params: params}).success(succ).error(err);
        },
        editGroup: function(params, data, succ, err){
            $http.patch('/apix/v1/group', data, {params: params}).success(succ).error(err);
        },
        deleteGroup: function(params, succ, err){
            $http.delete('/apix/v1/group/', {params: params}).success(succ).error(err);
        },

        getApis: function(params, succ, err){
        	$http.get('/apix/v1/apis', {params: params}).success(succ).error(err);
        },
        createApi: function(params, succ, err){
            $http.post('/apix/v1/apis', params).success(succ).error(err);
        },
        getApi: function(apiId, succ, err){
            $http.get('/apix/v1/apis/' + apiId).success(succ).error(err);
        },
        editApi: function(apiId, params, succ, err){
            $http.patch('/apix/v1/apis/' + apiId, params).success(succ).error(err);
        },
        deleteApi: function(apiId, succ, err){
            $http.delete('/apix/v1/apis/' + apiId).success(succ).error(err);
        }
    }
}
