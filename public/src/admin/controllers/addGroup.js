angular.module('auth').controller('GroupAddCtrl', GroupAddCtrl);

GroupAddCtrl.$inject = ['$timeout', '$stateParams', '$state', 'DataService'];

function GroupAddCtrl($timeout, $stateParams, $state, DataService) {

	var vm = this;

	////////////////////////// variables bind to view ///////////////////////////

	vm.group = {};	// group数据

	vm.submit = submit;	// 提交

	////////////////////////// functions bind to view ///////////////////////////

	function submit() {
		vm.group.systemId = $stateParams.systemId;
		DataService.createGroup(vm.group, function(res){
			$state.go('Detail', {
				systemId: $stateParams.systemId
			})
		}, function(err){
			console.log(err);
		})
	}

}
