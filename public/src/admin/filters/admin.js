angular.module('auth').filter('methodFilter', function () {
	var methods = {
		1: 'GET',
		2: 'POST'
	}
	return function(m){
		return methods[m];
	}
})