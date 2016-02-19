angular.module('auth').controller('DetailCtrl', DetailCtrl);

DetailCtrl.$inject = ['$timeout', '$stateParams', '$state', '$location', '$anchorScroll', 'DataService'];

function DetailCtrl($timeout, $stateParams, $state, $location, $anchorScroll, DataService) {

	var vm = this;

	vm.formData = {};

	vm.goto = function(target) {
		$location.hash(target.guid);
        $anchorScroll();
	}

	vm.create = function(group) {
		$state.go('New', {
			name: $stateParams.name,
			guid: group.guid
		});
	}

	vm.init = function() {
		vm.sys = {
			id: '10001',
			name: 'sncp',
			groups: [{
				guid: '101',
				name: 'User',
				apis: [{
					guid: '1001',
					name: '创建一个新用户',
					description: '创建一个新用户，第一版本',
					method: 'post',
					url: '/user',
					request: [{
						field: 'username',
						type: 'String',
						description: '用户名'
					},{
						field: 'email',
						type: 'String',
						description: '用户邮箱'
					}],
					response: [{
						field: 'id',
						type: 'String',
						description: '用户id'
					}]
				}, {
					guid: '1002',
					name: '更新一个用户',
					description: '更新一个用户，第一版本',
					method: 'put',
					url: '/user/:id',
					request: [{
						field: 'username',
						type: 'String',
						description: '用户名'
					},{
						field: 'email',
						type: 'String',
						description: '用户邮箱'
					}],
					response: [{
						field: 'id',
						type: 'String',
						description: '用户id'
					}]
				}]
			},{
				guid: '102',
				name: 'Disk',
				apis: [{
					guid: '1003',
					name: '创建一个新硬盘',
					description: '创建一个新硬盘，第一版本',
					method: 'post',
					url: '/user',
					request: [{
						field: 'name',
						type: 'String',
						description: '硬盘名称'
					}],
					response: [{
						field: 'id',
						type: 'String',
						description: '硬盘id'
					}]
				}]
			}]
		}
	}

	vm.init();

}