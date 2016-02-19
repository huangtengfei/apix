angular.module('auth').controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$window', '$state'];

function MainCtrl ($window, $state) {

	var vm = this;

	vm.formData = {};

	vm.logout = function() {
		delete $window.sessionStorage.token;
        $state.go("Login");
	}

}