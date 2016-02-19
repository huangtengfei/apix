(function(){
	var app = angular.module('auth', ['ui.router']);

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
				parent: 'Main',
				url: '/systems/:name',
				templateUrl: 'src/admin/templates/detail.html',
				controller: 'DetailCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('New', {
				parent: 'Main',
				url: '/systems/:name/:guid',
				templateUrl: 'src/admin/templates/new.html',
				controller: 'NewCtrl',
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