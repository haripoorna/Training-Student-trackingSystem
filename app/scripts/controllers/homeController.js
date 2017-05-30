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
        scope.isIdSubmit = function() {
            if (scope.role === "Trainer") {
                scope.userLogRequestObject.id = scope.userId;
                /*requestService.invokeService(requestAndResponse.trainerTrack, 'POST', null, scope.userLogRequestObject).then(function(response) {
                    if (response.data.type === "error") {
                        rootScope.wrongCredentials = response.data.message;
                    } else {
                        scope.isTrainer = true;
                        state.go('dashboard');
                    }
                });*/
                rootScope.isTrainer = true;
                rootScope.isStudent = false;
                state.go('dashboard');

            } else if (scope.role === "Student") {
                scope.userLogRequestObject.id = scope.userId;
                /*requestService.invokeService(requestAndResponse.studentTrack, 'POST', null, scope.userLogRequestObject).then(function(response) {
                    if (response.data.type === "error") {
                        rootScope.wrongCredentials = response.data.message;
                    } else {
                        scope.isStudent = true;
                        state.go('dashboard');
                    }
                });*/
                rootScope.isStudent = true;
                rootScope.isTrainer = false;
                state.go('dashboard');
            }
        };
    }]);
