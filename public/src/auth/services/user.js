angular.module('auth').factory('UserService', UserService);

UserService.$inject = ['$http', 'baseUrl'];

function UserService($http) {
    return {
        login: function(params, succ, err){
            $http.post('/login', params).success(succ).error(err);
        }
    }
}
