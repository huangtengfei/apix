angular.module('auth').controller('SystemsCtrl', SystemsCtrl);

SystemsCtrl.$inject = ['$timeout', '$state', 'DataService'];

function SystemsCtrl($timeout, $state, DataService) {

	var vm = this;

	vm.formData = {};

	vm.viewSys = function(sys) {
		$state.go('Detail', {
			systemId: sys._id
		})
	}

	vm.init = function() {

		DataService.getSystems(function(res){
			vm.sysList = res;
		}, function(err){
			console.log(err);
		})
	};	

	vm.init();

}