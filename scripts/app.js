'use strict';


var app = angular.module('lendingfront', [ 
	'ui.router',
	'ngStorage'
	]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider){

	$stateProvider	

		.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'views/dashboard.html',
			controller: 'dashboard_controller',
			controllerAs: 'dash'
		})

		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'auth_controller',
			controllerAs: 'login'
		})

		.state('signup', {
			url: '/signup',
			templateUrl: 'views/signup.html',
			controller: 'auth_controller',
			controllerAs: 'signup'
		});


	$urlRouterProvider.otherwise('/login');

	$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
	return {
	        'request': function (config) {
	            config.headers = config.headers || {};
	            if ($localStorage.token) {
	                config.headers.Authorization = 'Bearer ' + $localStorage.token;
	            }
	            return config;
	        },
	        'responseError': function(response) {
	            if(response.status === 401 || response.status === 403) {
	                $location.path('/login');
	            }
	            return $q.reject(response);
	        }
	    };
	}]);

});
