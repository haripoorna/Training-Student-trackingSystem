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
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
