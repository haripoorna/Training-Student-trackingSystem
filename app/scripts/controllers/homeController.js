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
                myStorage.setItem('id', scope.userLogRequestObject.id);

                requestService.invokeService(requestAndResponse.checkIn, 'POST', null, scope.userLogRequestObject).then(function(response) {
                    if (response.data.type === "error") {
                        rootScope.errorMessage = response.data.message;
                        rootScope.errorMessageFlag = true;
                    }
                    if (response.data.message.session) {
                        rootScope.isSession = true;
                        rootScope.userInfo = response.data.message;
                        myStorage.setItem('userInfo', JSON.stringify(rootScope.userInfo));
                        myStorage.setItem('user', response.data.message.tname);
                        myStorage.setItem('timeIn' , response.data.message.timeIn);
                        myStorage.setItem('isTrainer', true);
                        state.go('dashboard');
                        rootScope.isTrainer = true;
                    } 
                    else if(response.data.message.session === false){
                        rootScope.isSession = false;
                        rootScope.userInfo = response.data.message.course;
                        myStorage.setItem('userInfo', JSON.stringify(rootScope.userInfo));
                        myStorage.setItem('user', response.data.message.name);
                        myStorage.setItem('isTrainer', true);
                        rootScope.isTrainer = true;

                        state.go('dashboard');
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
                        myStorage.setItem('isStudent', true);
                        state.go('dashboard');
                    }
                });
                /*rootScope.isStudent = true;
                rootScope.isTrainer = false;
                state.go('dashboard');*/
            }
        };
        scope.fnHideErrorMsg = function(){
            rootScope.errorMessageFlag = false;
        }
    }]);
