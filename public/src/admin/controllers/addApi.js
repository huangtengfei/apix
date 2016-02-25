angular.module('auth').controller('ApiAddCtrl', ApiAddCtrl);

ApiAddCtrl.$inject = ['$stateParams', '$state', 'DataService'];

function ApiAddCtrl($stateParams, $state, DataService) {

	var vm = this;

	vm.api = {};	// api数据
	vm.formData = {};	// 页面数据

	vm.api.method = 1;	// api方法默认为GET

	// code-mirror 配置信息
	vm.cmOption = {
		theme: 'paraiso-dark',
		mode: {name: "javascript", json: true}
	};

	vm.submit = submit;	// 提交

	////////////////////////// functions bind to view ///////////////////////////

	function submit() {
		vm.api.groupId = $stateParams.groupId;
		DataService.createApi(vm.api, function(res){
			$state.go('Detail', {
				systemId: $stateParams.systemId
			})
		}, function(err){
			console.log(err);
		})
	}

}
