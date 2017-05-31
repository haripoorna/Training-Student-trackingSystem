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
        scope.userInfo = myStorage.getItem('userInfo');
        console.log(scope.userInfo);
        scope.dashboardContent = dashboardContent;
        console.log(scope.dashboardContent.trainer.Courses);
        if (!scope.userInfo) {
            state.go('home', {}, { reload: true });
        }
        scope.selectCourse = function(course) {
            course.isChecked = !course.isChecked;
            if (course.isChecked) {
                scope.courseSelected = course.isChecked;
            }
        };
        scope.startSession = function() {
            /*scope.date = date();
            scope.time = scope.date.getTime();
            console.log(scope.time);*/
            scope.d = new Date();
            scope.getHours = scope.d.getHours();
            scope.getMinutes = scope.d.getMinutes();
            scope.getSeconds = scope.d.getSeconds();
            console.log(scope.getHours + ":" + scope.getMinutes + ":" + scope.getSeconds);
            scope.totalTime = scope.getHours + ":" + scope.getMinutes + ":" + scope.getSeconds
            if (scope.courseSelected) {
                scope.sessionStarted = "Your session started";
            } else {
                alert("select your course");
            }
        };
    }]);
