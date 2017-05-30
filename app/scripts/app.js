'use strict';

/**
 * @ngdoc overview
 * @name trainingTrackingSystemApp
 * @description
 * # trainingTrackingSystemApp
 *
 * Main module of the application.
 */
angular
    .module('trainingTrackingSystemApp', [
        'ngAnimate',
        'ngAria',
        'ngMaterial',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngSanitize',
        'ngStorage',
        'ui.router',
        'ui-rangeSlider',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function(stateProvider, urlRouterProvider) {
        stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'homeController',
                controllerAs: 'home-controller'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard/dashboard.html',
                controller: 'dashboardController',
                controllerAs: 'dashboard-controller'
            });
        urlRouterProvider.otherwise(function($injector, $location) {
            var state = $injector.get('$state');
            state.go('home');
        });
    }]);
