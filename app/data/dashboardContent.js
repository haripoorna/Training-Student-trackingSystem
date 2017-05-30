'use strict';

angular.module('trainingTrackingSystemApp').constant(
    'dashboardContent', {
        "trainer": {
            "Name": "Naveen",
            "Courses": [{
                "name": "Nodejs",
                "isChecked": false
            }, {
                "name": "MongoDB",
                "isChecked": false
            }, {
                "name": "AngularJs",
                "isChecked": false
            }, {
                "name": "ExpressJs",
                "isChecked": false
            }]
        },
        "student": {
            "Name": "Shakeel",
            "Courses": [{
                "name": "Nodejs",
                "isChecked": false
            }, {
                "name": "MongoDB",
                "isChecked": false
            }, {
                "name": "AngularJs",
                "isChecked": false
            }, {
                "name": "ExpressJs",
                "isChecked": false
            }]
        }
    }
);
