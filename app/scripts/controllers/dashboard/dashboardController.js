'use strict';

/**
 * @ngdoc function
 * @name trainingTrackingSystemApp.controller:dashboardController
 * @description
 * # dashboardController
 * Controller of the trainingTrackingSystemApp
 */
angular.module('trainingTrackingSystemApp')
    .controller('dashboardController', ['$scope', '$rootScope', 'dashboardContent', '$state', 'requestService', 'requestAndResponse', function(scope, rootScope, dashboardContent, state, requestService, requestAndResponse) {
        var myStorage = localStorage;

        scope.startUserSessionRequest = {
            'id':null,
            'timeIn':null,
            'course':null,
            'tname':null
        }
        scope.stopUserSessionRequest = {
            'id':null,
            'timeOut':null,
            'tname':null
        }
        rootScope.userInfo = myStorage.getItem('userInfo');
        rootScope.user = myStorage.getItem('user');
        scope.id = myStorage.getItem('id');
        console.log(JSON.parse(rootScope.userInfo));
        scope.content = JSON.parse(rootScope.userInfo);
       
         scope.dashboardContent = dashboardContent;
        scope.isTrainer = myStorage.getItem('isTrainer');
        scope.isStudent = myStorage.getItem('isStudent');
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
            scope.getSeconds = scope.d.getSeconds();
            console.log(scope.getHours + ":" + scope.getMinutes + ":" + scope.getSeconds);
            scope.startUserSessionRequest.timeIn = scope.getHours + ":" + scope.getMinutes + ":" + scope.getSeconds
            scope.startUserSessionRequest.id = scope.id;
            scope.startUserSessionRequest.tname = rootScope.user;
            scope.startUserSessionRequest.course = scope.courseName;

            if (scope.courseSelected) {
                  requestService.invokeService(requestAndResponse.startTrainerSession, 'POST', null, scope.startUserSessionRequest).then(function(response) {
                    console.log(response)
                    scope.sessionStarted = "Your session started";
                });
                
            } else {
                alert("select your course");
            }
        };
        scope.stopSession =function(){
            scope.d = new Date();
            scope.getHours = scope.d.getHours();
            scope.getMinutes = scope.d.getMinutes();
            scope.getSeconds = scope.d.getSeconds();
            console.log(scope.getHours + ":" + scope.getMinutes + ":" + scope.getSeconds);
            scope.startUserSessionRequest.timeIn = scope.getHours + ":" + scope.getMinutes + ":" + scope.getSeconds
            scope.startUserSessionRequest.id = scope.id;
            scope.startUserSessionRequest.tname = rootScope.user;
            scope.startUserSessionRequest.course = scope.courseName;
            requestService.invokeService(requestAndResponse.stopTrainerSession, 'POST', null, scope.stopUserSessionRequest).then(function(response) {
                    console.log(response)
                    scope.sessionStarted = "Your session is stopped";
                });
        }
    }]);
