(function(){
	var app = angular.module('apix', ['ui.router', 'ui.codemirror']);

	app.value('baseUrl', 'localhost:3000/');

	app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/login');
		$stateProvider
			.state('Login', {
				url: '/login',
				templateUrl: 'src/auth/templates/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'vm'
			})
			.state('SignUp', {
				url: '/sign-up',
				templateUrl: 'src/auth/templates/signUp.html',
				controller: 'SignUpCtrl',
				controllerAs: 'vm'
			})
			// 主页面，里面有导航条，登录之后的页面都包含在这个页面中
			.state('Main', {
				abstract: true,
				templateUrl: 'src/common/templates/main.html',
				controller: 'MainCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('Systems', {
				parent: 'Main',
				url: '/systems',
				templateUrl: 'src/admin/templates/systems.html',
				controller: 'SystemsCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})			
			.state('Detail', {
				url: '/systems/:sysName',
				templateUrl: 'src/admin/templates/detail.html',
				controller: 'DetailCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('AddSystem', {
				parent: 'Main',
				url: '/new-system',
				templateUrl: 'src/admin/templates/addSystem.html',
				controller: 'SystemAddCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('AddGroup', {
				parent: 'Main',
				url: '/systems/:sysName/new-group',
				templateUrl: 'src/admin/templates/addGroup.html',
				controller: 'GroupAddCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('EditGroup', {
				parent: 'Main',
				url: '/systems/:sysName/:groupName/edit-group',
				templateUrl: 'src/admin/templates/editGroup.html',
				controller: 'GroupEditCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('AddApi', {
				parent: 'Main',
				url: '/systems/:sysName/:groupName/new-api',
				templateUrl: 'src/admin/templates/addApi.html',
				controller: 'ApiAddCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('EditApi', {
				parent: 'Main',
				url: '/systems/:sysName/:groupName/:apiId/edit-api',
				templateUrl: 'src/admin/templates/editApi.html',
				controller: 'ApiEditCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('ParamTips', {
				parent: 'Main',
				url: '/param-tips',
				templateUrl: 'src/admin/templates/paramTips.html',
				controller: 'ParamTipsCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})	
			.state('TestApi', {
				// parent: 'Main',
				url: '/apis/:apiId',
				templateUrl: 'src/admin/templates/testApi.html',
				controller: 'ApiTestCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('MockApi', {
				// parent: 'Main',
				url: '/systems/:sysName/:groupName/mock-api',
				templateUrl: 'src/admin/templates/mockApi.html',
				controller: 'MockApiCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
	}])

	app.config(function($httpProvider) {
		$httpProvider.interceptors.push('TokenInterceptor');
	})

	app.run(function($rootScope, $state, $window){
		// 如果状态发生改变，对需要登录的页面先判断是否登录了
		$rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams){
			if(toState.access && toState.access.requiredLogin && !$window.sessionStorage.token){
				evt.preventDefault();
				$state.go('Login');
			}
		});
	})

})()