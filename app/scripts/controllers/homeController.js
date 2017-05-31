'use strict';

/**
 * @ngdoc function
 * @name trainingTrackingSystemApp.controller:homeController
 * @description
 * # homeController
 * Controller of the trainingTrackingSystemApp
 */
angular.module('trainingTrackingSystemApp')
    .controller('homeController', ['$scope', '$rootScope', 'homeContent', '$state', 'requestService', 'requestAndResponse', function(scope, rootScope, homeContent, state, requestService, requestAndResponse) {
        var myStorage = localStorage;
        scope.homeContent = homeContent;
        scope.selectedRole = homeContent.role;
        rootScope.roleSelected = false;
        rootScope.isTrainer = false;
        rootScope.isStudent = false;
        scope.roleIsSelected = function(role) {
            scope.roleSelected = true;
            scope.role = role;
        };
        scope.userLogRequestObject = {
            id: null
        }
        scope.isIdSubmit = function(id) {
            if (scope.role === "Trainer") {
                scope.userLogRequestObject.id = id;
                requestService.invokeService(requestAndResponse.checkIn, 'POST', null, scope.userLogRequestObject).then(function(response) {
                    if (response.data.type === "error") {
                        rootScope.errorMessage = response.data.message;
                        console.log(rootScope.errorMessage);
                    } else {
                        myStorage.setItem('userInfo', response.data.message); debugger;
                        scope.isTrainer = true;
                        state.go('dashboard');
                        console.log(response.data.message);
                    }
                });
                /*rootScope.isTrainer = true;
                rootScope.isStudent = false;
                state.go('dashboard');*/

            } else if (scope.role === "Student") {
                scope.userLogRequestObject.id = scope.id;
                requestService.invokeService(requestAndResponse.checkIn, 'POST', null, scope.userLogRequestObject).then(function(response) {
                    if (response.type === "error") {
                        rootScope.wrongCredentials = response.data.message;
                    } else {
                        scope.isStudent = true;
                        state.go('dashboard');
                    }
                });
                /*rootScope.isStudent = true;
                rootScope.isTrainer = false;
                state.go('dashboard');*/
            }
        };
    }]);
