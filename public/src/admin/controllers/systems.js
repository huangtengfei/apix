angular.module('auth').controller('SystemsCtrl', SystemsCtrl);

SystemsCtrl.$inject = ['$timeout', '$state', 'DataService'];

function SystemsCtrl($timeout, $state, DataService) {

	var vm = this;

	vm.formData = {};

	vm.viewSys = function(sys) {
		$state.go('Detail', {
			name: sys.name
		})
	}

	vm.init = function() {

		vm.sysList = [{
			id: '10001',
			name: 'sncp',
			description: '苏宁私有云OS'			
		},{
			id: '10002',
			name: 'mpsp',
			description: '促销管理系统'
		},{
			id: '10003',
			name: 'mpisv',
			description: '云商城控制台'
		},{
			id: '10004',
			name: 'sncd',
			description: '持续交付平台'
		}]

	};	

	vm.init();

}