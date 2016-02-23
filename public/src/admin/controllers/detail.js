angular.module('auth').controller('DetailCtrl', DetailCtrl);

DetailCtrl.$inject = ['$timeout', '$stateParams', '$state', '$location', '$anchorScroll', 'DataService'];

function DetailCtrl($timeout, $stateParams, $state, $location, $anchorScroll, DataService) {

	var vm = this;

	vm.formData = {};

	vm.cmOption = {
		theme: '3024-day',
		readOnly: true,
		mode: {name: "javascript", json: true}
	}

	vm.goto = function(target) {
		$location.hash(target._id);
        $anchorScroll();
	}

	vm.create = function(group) {
		$state.go('New', {
			systemId: $stateParams.id,
			groupId: group._id
		});
	}
  
	vm.init = function() {

		var params = {
			id: $stateParams.id,
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

	vm.init();

}