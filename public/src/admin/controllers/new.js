angular.module('auth').controller('NewCtrl', NewCtrl);

NewCtrl.$inject = ['$timeout', '$stateParams', '$state'];

function NewCtrl($timeout, $stateParams, $state) {

	var vm = this;

	vm.api = {};

	vm.api.inputParams = [];

	vm.addInput = function() {

		vm.api.inputParams.push({
			field: '',
			type: 1,
			description: ''
		})

	};

	vm.removeInput = function(index) {
		vm.api.inputParams.splice(index, 1);
	}


}
