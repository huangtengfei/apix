(function(){
	var app = angular.module('apix', ['ui.router', 'ui.codemirror']);

	app.value('baseUrl', 'localhost:3000/');

	app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/login');
		$stateProvider
            // 登录注册
			.state('Login', {
				url: '/login',
				templateUrl: 'src/auth/templates/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'vm'
			})
			.state('SignUp', {
				url: '/sign-up',
				templateUrl: 'src/auth/templates/sign-up.html',
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

            // system相关
			.state('Systems', {
				parent: 'Main',
				url: '/systems',
				templateUrl: 'src/admin/templates/systems.html',
				controller: 'SystemsCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
            .state('AddSystem', {
                parent: 'Main',
                url: '/new-system',
                templateUrl: 'src/admin/templates/add-system.html',
                controller: 'SystemAddCtrl',
                controllerAs: 'vm',
                access: {requiredLogin: true}
            })

            // group相关
			.state('Detail', {
				url: '/systems/:sysName',
				templateUrl: 'src/admin/templates/detail.html',
				controller: 'DetailCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('AddGroup', {
				parent: 'Main',
				url: '/systems/:sysName/new-group',
				templateUrl: 'src/admin/templates/add-group.html',
				controller: 'GroupAddCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('EditGroup', {
				parent: 'Main',
				url: '/systems/:sysName/:groupName/edit-group',
				templateUrl: 'src/admin/templates/edit-group.html',
				controller: 'GroupEditCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})

            // api相关
			.state('AddApi', {
				parent: 'Main',
				url: '/systems/:sysName/:groupName/new-api',
				templateUrl: 'src/admin/templates/add-api.html',
				controller: 'ApiAddCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('EditApi', {
				parent: 'Main',
				url: '/systems/:sysName/:groupName/:apiId/edit-api',
				templateUrl: 'src/admin/templates/edit-api.html',
				controller: 'ApiEditCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})
			.state('ParamTips', {
				parent: 'Main',
				url: '/param-tips',
				templateUrl: 'src/admin/templates/param-tips.html',
				controller: 'ParamTipsCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})

            // test api
			.state('TestApi', {
				url: '/test-api/apis/:apiId',
				templateUrl: 'src/admin/templates/test-api.html',
				controller: 'ApiTestCtrl',
				controllerAs: 'vm',
				access: {requiredLogin: true}
			})

            // mock api
			.state('MockApi', {
				url: '/mock-api/:sysName/:groupName',
				templateUrl: 'src/admin/templates/mock-api.html',
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