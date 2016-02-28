angular.module('apix').controller('GroupEditCtrl', GroupEditCtrl);

GroupEditCtrl.$inject = ['$stateParams', '$state', 'ApixService'];

function GroupEditCtrl($stateParams, $state, ApixService) {

	var vm = this;

	////////////////////////// variables bind to view ///////////////////////////

	vm.group = {};	// group数据

	vm.submit = submit;	// 提交

	////////////////////////// functions bind to view ///////////////////////////

	function submit() {

		var groupData = {};
		groupData.desc = vm.group.desc;

		if(vm.group.name != $stateParams.groupName){
			var baseUrl = '/mock-api/' + $stateParams.sysName + '/' + vm.group.name + 's';
			groupData.mockApis = [{
				method: 1,
				name: '列出所有 ' + vm.group.name,
				url:  baseUrl
			},{
				method: 2,
				name: '新建一个 ' + vm.group.name,
				url: baseUrl
			},{
				method: 1,
				name: '获取某个指定的 ' + vm.group.name,
				url: baseUrl + '/:id'
			},{
				method: 3,
				name: '更新某个指定的 ' + vm.group.name,
				url: baseUrl + '/:id'
			},{
				method: 4,
				name: '删除某个指定的 ' + vm.group.name,
				url: baseUrl + '/:id'
			}];
			groupData.name = vm.group.name;
		}

		var params = {
			system: $stateParams.sysName,
			name: $stateParams.groupName
		}
		ApixService.editGroup(params, groupData, function(res){
            if(res.errMsg){
                vm.message = res.errMsg;
            }else{
                $state.go('Detail', {
                    sysName: $stateParams.sysName
                })
            }
		}, function(err){
			console.log(err);
		})
	}

	////////////////////////////// inner functions /////////////////////////////

	function init() {
		var params = {
			system: $stateParams.sysName,
			name: $stateParams.groupName
		}
		ApixService.getGroup(params, function(res){
			vm.group = res;
		}, function(err){
			console.log(err);
		})
	}

	init();

}
