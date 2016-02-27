angular.module('apix').controller('DetailCtrl', DetailCtrl);

DetailCtrl.$inject = ['$stateParams', '$state', '$location', '$anchorScroll', 'AlertService', 'ApixService'];

function DetailCtrl($stateParams, $state, $location, $anchorScroll, AlertService, ApixService) {

	var vm = this;

	////////////////////////// variables bind to view ///////////////////////////

	vm.formData = {};	// 页面数据

	// code-mirror 配置信息
	vm.cmOption = {
		theme: 'paraiso-dark',
		readOnly: true,
		mode: {name: "javascript", json: true}
	};

	vm.locate = locate;	// 通过左侧目录定位右侧位置
	vm.addGroup = addGroup;	// 添加一个api分组
	vm.addApi = addApi;	// 添加一个api
	vm.deleteApi = deleteApi;	// 删除一个api
    vm.deleteGroup = deleteGroup;   // 删除一个group

	////////////////////////// functions bind to view ///////////////////////////

	function locate (target) {
		$location.hash(target._id);
        $anchorScroll();
	}

	function addGroup() {
		$state.go('AddGroup', {
			sysName: $stateParams.sysName
		});
	}

	function addApi(group) {
		$state.go('AddApi', {
			sysName: $stateParams.sysName,
			groupName: group.name
		});
	}

	function deleteApi(api) {
		AlertService.confirm({
			title: '温馨提示',
			content: '确定要删除这个API吗？'
		}).then(function(){
			ApixService.deleteApi(api._id, function(res){
				init();
			}, function(err){
				console.log(err);
			})
		})
	}

    function deleteGroup(group) {
        AlertService.confirm({
            title: '温馨提示',
            content: '删除Group的同时其下的所有API也将一同删除，确定吗？'
        }).then(function(){
            var params = {
                system: $stateParams.sysName,
                name: group.name
            }
            ApixService.deleteGroup(params, function(res){
                init();
            }, function(err){
                console.log(err);
            })
        })
    }

	////////////////////////////// inner functions /////////////////////////////

	// 初始化，根据系统name查询已存在group和api
	function init() {

		vm.formData.sysName = $stateParams.sysName;

		var params = {
			system: $stateParams.sysName
		};

		ApixService.getGroups(params, function(groups){
			vm.groups = groups;
			vm.groups.forEach(function(group){
				var params = {
					system: $stateParams.sysName,
					group: group.name
				}
				ApixService.getApis(params, function(apis){
					group.apis = apis;
				}, function(err){
					console.log(err);
				})
			})
		}, function(err){
			console.log(err);
		})
	}

	init();

}