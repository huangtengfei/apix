angular.module('auth').controller('GroupAddCtrl', GroupAddCtrl);

GroupAddCtrl.$inject = ['$stateParams', '$state', 'DataService'];

function GroupAddCtrl($stateParams, $state, DataService) {

	var vm = this;

	////////////////////////// variables bind to view ///////////////////////////

	vm.group = {};	// group数据

	vm.submit = submit;	// 提交

	////////////////////////// functions bind to view ///////////////////////////

	function submit() {

		vm.group.system = $stateParams.sysName;

		vm.group.mockApis = [{
			method: 1,
			name: '列出所有 ' + vm.group.name,
			url: '/mock-api/' + vm.group.name + 's'
		},{
			method: 2,
			name: '新建一个 ' + vm.group.name,
			url: '/mock-api/' + vm.group.name + 's'
		},{
			method: 1,
			name: '获取某个指定的 ' + vm.group.name,
			url: '/mock-api/' + vm.group.name + 's' + '/:id'
		},{
			method: 3,
			name: '更新某个指定的 ' + vm.group.name,
			url: '/mock-api/' + vm.group.name + 's' + '/:id'
		},{
			method: 4,
			name: '删除某个指定的 ' + vm.group.name,
			url: '/mock-api/' + vm.group.name + 's' + '/:id'
		}];

		DataService.createGroup(vm.group, function(res){
			$state.go('Detail', {
				sysName: $stateParams.sysName
			})
		}, function(err){
			console.log(err);
		})
	}

}
