angular.module('auth').controller('SystemsCtrl', SystemsCtrl);

SystemsCtrl.$inject = ['$state', 'DataService'];

function SystemsCtrl($state, DataService) {

	var vm = this;

	////////////////////////// variables bind to view ///////////////////////////

	vm.formData = {};	// 页面数据

	vm.viewSys = viewSys;	// 查看某一系统api详情

	////////////////////////// functions bind to view ///////////////////////////

	function viewSys(sys) {
		$state.go('Detail', {
			systemId: sys._id
		})
	}

	////////////////////////////// inner functions /////////////////////////////

	// 初始化，查询所有系统
	function init() {

		DataService.getSystems(function(res){
			vm.sysList = res;
		}, function(err){
			console.log(err);
		})
	};	

	init();

}