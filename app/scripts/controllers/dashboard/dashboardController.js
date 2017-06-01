'use strict';

/**
 * @ngdoc function
 * @name trainingTrackingSystemApp.controller:dashboardController
 * @description
 * # dashboardController
 * Controller of the trainingTrackingSystemApp
 */
angular.module('trainingTrackingSystemApp')
    .controller('dashboardController', ['$scope', '$rootScope', 'dashboardContent', '$state', 'requestService', 'requestAndResponse', '$window', function(scope, rootScope, dashboardContent, state, requestService, requestAndResponse, window) {
        var myStorage = localStorage;

        scope.startUserSessionRequest = {
            'id': null,
            'timeIn': null,
            'course': null,
            'tname': null
        }
        scope.stopUserSessionRequest = {
            'id': null,
            'timeOut': null,
            'tname': null,
            "totalTime" : null
        }
        rootScope.userInfo = myStorage.getItem('userInfo');
        scope.timeIn = myStorage.getItem('timeIn');
        rootScope.user = myStorage.getItem('user');
        scope.id = myStorage.getItem('id');
        scope.content = JSON.parse(rootScope.userInfo);

        scope.dashboardContent = scope.content;
        rootScope.isTrainer = myStorage.getItem('isTrainer');
        rootScope.isStudent = myStorage.getItem('isStudent');
        if (!scope.userInfo) {
            state.go('home', {}, { reload: true });
        }
        scope.selectCourse = function(course) {
            scope.courseName = course.name;
            course.isChecked = !course.isChecked;
            if (course.isChecked) {
                scope.courseSelected = course.isChecked;
                console.log(scope.courseSelected)
            }
        };
        scope.startSession = function(courseName) {
            /*scope.date = date();
            scope.time = scope.date.getTime();
            console.log(scope.time);*/
            console.log(courseName);
            scope.d = new Date();
            scope.getHours = scope.d.getHours();
            scope.getMinutes = scope.d.getMinutes();
            scope.startUserSessionRequest.timeIn = scope.getHours + ":" + scope.getMinutes;
            scope.startUserSessionRequest.id = scope.id;
            scope.startUserSessionRequest.tname = rootScope.user;
            scope.startUserSessionRequest.course = scope.courseName;

            if (scope.courseSelected) {
                requestService.invokeService(requestAndResponse.startTrainerSession, 'POST', null, scope.startUserSessionRequest).then(function(response) {
                    console.log(response)
                    scope.sessionStarted = "Your session started";
                    setTimeout(function() {
                        state.go('home');
                        window.localStorage.clear();
                    }, 2000);
                });

            } else {
                alert("select your course");
            }
        };
        scope.stopSession = function() {
            scope.d = new Date();
            scope.getHours = scope.d.getHours();
            scope.getMinutes = scope.d.getMinutes();
            scope.stopUserSessionRequest.timeOut = scope.getHours + ":" + scope.getMinutes;
            scope.stopUserSessionRequest.id = scope.id;
            scope.stopUserSessionRequest.tname = rootScope.user;

            function diff(timeIn, timeOut) {
                timeIn = timeIn.split(":");
                timeOut = timeOut.split(":");
                var startDate = new Date(0, 0, 0, timeIn[0], timeIn[1], 0);
                var endDate = new Date(0, 0, 0, timeOut[0], timeOut[1], 0);
                var diff = endDate.getTime() - startDate.getTime();
                var hours = Math.floor(diff / 1000 / 60 / 60);
                diff -= hours * 1000 * 60 * 60;
                var minutes = Math.floor(diff / 1000 / 60);
                scope.stopUserSessionRequest.totalTime = (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes
                return scope.stopUserSessionRequest.totalTime;
            }
            diff(scope.timeIn, scope.stopUserSessionRequest.timeOut);
            requestService.invokeService(requestAndResponse.stopTrainerSession, 'POST', null, scope.stopUserSessionRequest).then(function(response) {
                debugger;
                scope.sessionStopped = "Your session is Completed";
                setTimeout(function() {
                    state.go('home');
                    window.localStorage.clear();
                }, 5000);
            });
        }
    }]);
