angular.module('apix').controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ['$window', '$state', 'UserService'];

function SignUpCtrl ($window, $state, UserService) {

	var vm = this;

	vm.formData = {};

	vm.signUp = function() {
		if(vm.formData.password != vm.formData.rPassword){
			vm.message = '两次密码不一致';
			return;
		}
		UserService.signUp(vm.formData, function(res){
			if(res.pass){
				$state.go('Login');
			}else{
				vm.message = res.data;
			}
		}, function(err){
			console.log(err);
		})
	};

	(function() {
		if($window.sessionStorage.token) {
			$state.go('Systems');
		}
	})();

}