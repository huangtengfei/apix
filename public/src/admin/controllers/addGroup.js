angular.module('auth').controller('GroupAddCtrl', GroupAddCtrl);

GroupAddCtrl.$inject = ['$timeout', '$stateParams', '$state', 'DataService'];

function GroupAddCtrl($timeout, $stateParams, $state, DataService) {

	var vm = this;

	vm.group = {};

	vm.submit = function() {
		vm.group.systemId = $stateParams.systemId;
		DataService.createGroup(vm.group, function(res){
			console.log(res);
			$state.go('Detail', {
				systemId: $stateParams.systemId
			})
		}, function(err){
			console.log(err);
		})
	}

}
