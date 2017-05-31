'use strict';

angular.module('trainingTrackingSystemApp').constant(
    'requestAndResponse', {
        'domain': 'http://192.168.1.30:8080/',
        'checkIn' : 'users/check',
        'startTrainerSession':'users/sessIn'
    }
);
