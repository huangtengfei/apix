angular.module('auth').factory('TokenInterceptor', TokenInterceptor);

TokenInterceptor.$inject = ['$q', '$window', '$location']

function TokenInterceptor($q, $window, $location) {
	return {
		request: function (config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers.Authorization = $window.sessionStorage.token;
			}
			return config;
		},

		responseError: function(response) {
            if(response.status === 401 || response.status === 403) {
            	// 如果response.status为401，而token又存在，说明token过期了
            	if($window.sessionStorage.token){
            		delete $window.sessionStorage.token;
            	}
                $location.path('/login');
            }
            return $q.reject(response);
        }
	};
}