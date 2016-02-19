angular.module('auth').factory('DataService', DataService);

DataService.$inject = ['$http', 'baseUrl'];

function DataService($http) {
    return {
        list: function(succ, err){
            $http.get('/list').success(succ).error(err);
        }
    }
}
