angular.module('auth').controller('ApiTestCtrl', ApiTestCtrl);

ApiTestCtrl.$inject = ['$stateParams', 'DataService'];

function ApiTestCtrl($stateParams, DataService) {

	var vm = this;

	// code-mirror 配置信息
	vm.cmOption = {
		theme: 'paraiso-dark',
		readOnly: true,
		mode: {name: "javascript", json: true}
	};

	////////////////////////// variables bind to view ///////////////////////////

	vm.api = {};	// api对象，通过id查得详情

	////////////////////////// functions bind to view ///////////////////////////

	////////////////////////////// inner functions /////////////////////////////

	// 初始化，根据apiId查询api详情
	function init(){
		var params = {
			id: $stateParams.apiId
		}
		DataService.getApi(params, function(res){
			vm.api = res;
		}, function(err){
			console.log(err);
		})
	}

	init();	
}
