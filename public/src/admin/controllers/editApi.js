angular.module('apix').controller('ApiEditCtrl', ApiEditCtrl);

ApiEditCtrl.$inject = ['$stateParams', '$state', 'ApixService'];

function ApiEditCtrl($stateParams, $state, ApixService) {

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
		ApixService.editApi($stateParams.apiId, vm.api, function(res){
			$state.go('Detail', {
				sysName: $stateParams.sysName
			})
		}, function(err){
			console.log(err);
		})
	}

	////////////////////////////// inner functions /////////////////////////////

	// 初始化，根据apiId查询api详情
	function init(){
		ApixService.getApi($stateParams.apiId, function(res){
			vm.api = res;
		}, function(err){
			console.log(err);
		})
	}

	init();

}
