angular.module('auth').controller('MockApiCtrl', MockApiCtrl);

MockApiCtrl.$inject = ['$stateParams', '$state', 'DataService'];

function MockApiCtrl($stateParams, $state, DataService) {

	var vm = this;

	vm.formData = {};

	vm.selectApi = selectApi;

	////////////////////////// functions bind to view ///////////////////////////

	function selectApi(api) {
		vm.activeApi = api;
	}

	////////////////////////////// inner functions /////////////////////////////

	function init() {
		vm.formData.groupName = $stateParams.groupName;
		var params = {
			system: $stateParams.sysName,
			name: $stateParams.groupName
		}
		DataService.getGroup(params, function(res){
			vm.mockApis = res.mockApis;
			vm.activeApi = vm.mockApis[0];
		}, function(err){
			console.log(err);
		})
	}

	init();
}
