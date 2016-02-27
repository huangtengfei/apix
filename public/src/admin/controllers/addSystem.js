angular.module('apix').controller('SystemAddCtrl', SystemAddCtrl);

SystemAddCtrl.$inject = ['$window', '$state', 'ApixService'];

function SystemAddCtrl($window, $state, ApixService) {

	var vm = this;

	////////////////////////// variables bind to view ///////////////////////////

	vm.system = {};	// system数据

	vm.submit = submit;	// 提交

	////////////////////////// functions bind to view ///////////////////////////

	function submit() {

		vm.system.userId = $window.sessionStorage.userId;

		ApixService.createSystem(vm.system, function(res){
			$state.go('Systems');
		}, function(err){
			console.log(err);
		})
	}

}
