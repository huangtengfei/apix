angular.module('apix').filter('methodFilter', function () {
	var methods = {
		1: 'GET',
		2: 'POST',
		3: 'PATCH',
		4: 'DELETE'
	}
	return function(m){
		return methods[m];
	}
})