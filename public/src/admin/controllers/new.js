angular.module('auth').controller('NewCtrl', NewCtrl);

NewCtrl.$inject = ['$timeout', '$stateParams', '$state', 'DataService'];

function NewCtrl($timeout, $stateParams, $state, DataService) {

	var vm = this;

	vm.api = {};

	vm.api.method = 1;

	vm.api.request = 'eg:\n' + 
		'\n{' + 		
		'\n\tusername: String,	// 用户名' + 
		'\n\tpassword: String,	// 用户密码' + 
		'\n\tage: Number 		// 用户年龄' + 
		'\n}';

	vm.api.response = 'eg:\n' + 
		'\n{' + 
		'\n\terrCode: String,	// 失败码，0表示成功' + 
		'\n\terrMsg: String,		// 失败信息，success表示成功' + 
		'\n\tdata: Object		// 返回数据' +
		'\n\t\tid: String		// 用户id' + 
		'\n}'


	vm.cmOption = {
		theme: '3024-day',
		mode: {name: "javascript", json: true}
	}

	vm.submit = function() {
		vm.api.groupId = $stateParams.groupId;
		DataService.createApi(vm.api, function(res){
			console.log(res);
		}, function(err){
			console.log(err);
		})
	}

}
