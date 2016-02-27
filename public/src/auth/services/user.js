angular.module('apix').factory('UserService', UserService);

UserService.$inject = ['$http', 'baseUrl'];

function UserService($http) {
    return {
        login: function(params, succ, err){
            $http.post('/apix/v1/login', params).success(succ).error(err);
        },
        signUp: function(params, succ, err){
            $http.post('/apix/v1/signUp', params).success(succ).error(err);
        }
    }
}
