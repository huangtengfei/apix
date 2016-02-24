angular.module('auth').controller('ApiTestCtrl', ApiTestCtrl);

ApiTestCtrl.$inject = ['$stateParams', 'CommonService', 'DataService', 'MockService'];

function ApiTestCtrl($stateParams, CommonService, DataService, MockService) {

	var vm = this;

	vm.api = {};
	vm.formData = {};

	//vm.formData.showResp = false;

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

	vm.formData.body = [];
	vm.formData.body.push({
		key: '',
		value: ''
	})

	vm.formData.tabs = [{
		name: 'Params'
	},{
		name: 'Headers'
	},{
		name: 'Body'
	}]

	vm.formData.selectedTab = vm.formData.tabs[0];

	vm.selectTab = function(tab) {
		vm.formData.selectedTab = tab;
	}

	vm.addOne = function(arr) {
		arr.push({
			key: '',
			value: ''
		})
	}

	vm.removeOne = function(arr, index) {
		if(arr.length > 1){
			arr.splice(index, 1);
		}
	}

	vm.send = function() {
		console.log(vm.formData);
		var params = {};
		vm.formData.params.forEach(function(item){
			params[item.key] = item.value;
		})
		MockService.getUrl(vm.formData.url, params, function(res){
			vm.formData.output = JSON.stringify(res);
			//vm.formData.showResp = true;
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
