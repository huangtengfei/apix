angular.module('auth').controller('ApiAddCtrl', ApiAddCtrl);

ApiAddCtrl.$inject = ['$timeout', '$stateParams', '$state', 'DataService'];

function ApiAddCtrl($timeout, $stateParams, $state, DataService) {

	var vm = this;

	vm.api = {};
	vm.formData = {};

	vm.api.method = 1;

	vm.cmOption = {
		theme: 'paraiso-dark',
		mode: {name: "javascript", json: true}
	}

	vm.submit = function() {
		vm.api.groupId = $stateParams.groupId;
		DataService.createApi(vm.api, function(res){
			console.log(res);
			$state.go('Detail', {
				systemId: $stateParams.systemId
			})
		}, function(err){
			console.log(err);
		})
	}

}
