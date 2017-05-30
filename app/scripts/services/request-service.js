'use strict';

angular.module('trainingTrackingSystemApp').factory('requestService', ['$http', 'requestAndResponse', function($http, requestAndResponse) {
    var invokeService = function(_url, method, headers, params) {
        return $http({
            url: requestAndResponse.domain + angular.copy(_url),
            method: method || 'GET',
            headers: headers || 'application/json;',
            params: ((method === 'POST') || (method === 'PUT')) ? null : params,
            data: ((method === 'POST') || (method === 'PUT')) ? params : null
        });
    };
    return {
        'invokeService': invokeService
    };
}]);