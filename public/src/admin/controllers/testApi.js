angular.module('auth').controller('ApiTestCtrl', ApiTestCtrl);

ApiTestCtrl.$inject = ['$stateParams', 'CommonService', 'DataService', 'MockService'];

function ApiTestCtrl($stateParams, CommonService, DataService, MockService) {

	var vm = this;

	vm.api = {};
	vm.formData = {};

	vm.formData.params = [];
	vm.formData.params.push({
		key: '',
		value: ''
	})

	vm.formData.headers = [];
	vm.formData.headers.push({
		key: '',
		value: ''
	})

	vm.addOne = function(arr) {
		arr.push({
			key: '',
			value: ''
		})
	}

	vm.removeOne = function(arr, index) {
		arr.splice(index, 1);
	}

	vm.send = function() {
		console.log(vm.formData);
		var params = {};
		vm.formData.params.forEach(function(item){
			params[item.key] = item.value;
		})
		MockService.getUrl(vm.formData.url, params, function(res){
			vm.formData.output = JSON.stringify(res);
		}, function(err){
			console.log(err);
		});
	}

	vm.formatResp = function() {
		vm.formData.output = CommonService.format(vm.formData.output);
	}

	vm.cmOption = {
		theme: 'paraiso-dark',
		mode: {name: "javascript", json: true}
	};

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
