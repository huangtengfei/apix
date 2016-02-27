angular.module('apix').controller('ApiAddCtrl', ApiAddCtrl);

ApiAddCtrl.$inject = ['$stateParams', '$state', 'ApixService'];

function ApiAddCtrl($stateParams, $state, ApixService) {

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
		vm.api.group = $stateParams.groupName;
		vm.api.system = $stateParams.sysName;
		ApixService.createApi(vm.api, function(res){
			$state.go('Detail', {
				sysName: $stateParams.sysName
			})
		}, function(err){
			console.log(err);
		})
	}

}
