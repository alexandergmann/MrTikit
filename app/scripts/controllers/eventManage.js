'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventManageCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventManageCtrl', function ($scope, $Event, $stateParams, $mdToast) {
    console.log('eventManage');
    $scope.setEvent($stateParams.eventId);
    $scope.event = {};
    
    $scope.eventLoad = function (event) {
        $scope.event = event;
        $scope.event.startDateTime = new Date(event.startDateTime);
        if ($scope.event.startDateTime && $scope.event.startDateTime instanceof Date && !isNaN($scope.event.startDateTime.valueOf())) {
            $scope.event.startDate = $scope.event.startDateTime;
            $scope.event.startTime = $scope.event.startDateTime;
        } else {
            $scope.event.startDateTime = null;
            $scope.event.startDate = null;
            $scope.event.startTime = null;
        }
        $scope.event.endDateTime = new Date(event.endDateTime);
        if ($scope.event.endDateTime && $scope.event.endDateTime instanceof Date && !isNaN($scope.event.endDateTime.valueOf())) {
            $scope.event.endDate = $scope.event.endDateTime;
            $scope.event.endTime = $scope.event.endDateTime;
        } else {
            $scope.event.endDateTime = null;
            $scope.event.endDate = null;
            $scope.event.endTime = null;
        }
    };
    
    $scope.onError = function(error, estring) {
        if (error.error) {
            $mdToast.showSimple(estring + error.error);
        } else if (error.data && error.data.message) {
            $mdToast.showSimple(estring + error.data.message);
        } else {
            $mdToast.showSimple(estring + 'Unknown');
            console.log(error);
        }
    };
    
    $scope.eventPromise = $Event.get($scope.curEventId, $scope.user.loginKey);
    $scope.eventPromise.then(function (event) {
        $mdToast.showSimple('Event Load: Success');
        $scope.eventLoad(event);
    }, function (error) {
        $scope.onError(error, 'Event Load Error: ')
    });
    
    $scope.updateEvent = function () {
        if ($scope.event.startDate && $scope.event.startDate instanceof Date && !isNaN($scope.event.startDate.valueOf())) {
            $scope.event.startDateTime = new Date($scope.event.startDate);
            if ($scope.event.startTime) {
                $scope.event.startDateTime.setHours($scope.event.startTime.getHours());
                $scope.event.startDateTime.setMinutes($scope.event.startTime.getMinutes());
            }
        } else {
            $scope.event.startDateTime = null;
        }
        if ($scope.event.endDate && $scope.event.endDate instanceof Date && !isNaN($scope.event.endDate.valueOf())) {
            $scope.event.endDateTime = new Date($scope.event.endDate);
            if ($scope.event.endTime) {
                $scope.event.endDateTime.setHours($scope.event.endTime.getHours());
                $scope.event.endDateTime.setMinutes($scope.event.endTime.getMinutes());
            }
        } else {
            $scope.event.endDateTime = null;
        }
        var rv = $Event.update($scope.user.loginKey, $scope.event);
        rv.then(function (event) {
            $mdToast.showSimple('Event Update: Success');
            $scope.eventLoad(event);
        }, function (error) {
            $scope.onError(error, 'Event Update Error: ')
        });
    };
    
});