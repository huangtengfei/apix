angular.module('auth').controller('DetailCtrl', DetailCtrl);

DetailCtrl.$inject = ['$stateParams', '$state', '$location', '$anchorScroll', 'DataService'];

function DetailCtrl($stateParams, $state, $location, $anchorScroll, DataService) {

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


	////////////////////////// functions bind to view ///////////////////////////

	function locate (target) {
		$location.hash(target._id);
        $anchorScroll();
	}

	function addGroup() {
		$state.go('AddGroup', {
			systemId: $stateParams.systemId
		});
	}

	function addApi(group) {
		$state.go('AddApi', {
			systemId: $stateParams.systemId,
			groupId: group._id
		});
	}

	////////////////////////////// inner functions /////////////////////////////

	// 初始化，根据系统id查询已存在group和api
	function init() {

		var params = {
			id: $stateParams.systemId,
			name: 'abc'
		};

		DataService.getGroups(params, function(groups){
			vm.groups = groups;
			vm.groups.forEach(function(group){
				var params = {
					id: group._id
				}
				DataService.getApis(params, function(apis){
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