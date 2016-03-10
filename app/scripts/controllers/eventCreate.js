'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventCreateCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreateCtrl', function ($scope, $User, $Event, $mdToast) {
    console.log('eventCreate')
    $scope.event = {};
    $scope.createEvent = function () {
        $scope.event.owner = $scope.user.id;
        if ($scope.event.startDate && $scope.event.startDate instanceof Date && !isNaN($scope.event.startDate.valueOf())) {
            $scope.event.startDateTime = new Date($scope.event.startDate);
            if ($scope.event.startTime) {
                $scope.event.startDateTime.setHours($scope.event.startTime.getHours());
                $scope.event.startDateTime.setMinutes($scope.event.startTime.getMinutes());
            }
        } else {$scope.event.startDateTime = null;}
        if ($scope.event.endDate && $scope.event.endDate instanceof Date && !isNaN($scope.event.endDate.valueOf())) {
            $scope.event.endDateTime = new Date($scope.event.endDate);
            if ($scope.event.endTime) {
                $scope.event.endDateTime.setHours($scope.event.endTime.getHours());
                $scope.event.endDateTime.setMinutes($scope.event.endTime.getMinutes());
            }
        }else {$scope.event.endDateTime = null;}
        var rv = $Event.create($scope.user.loginKey, $scope.event);
        rv.then(function (event) {
            $mdToast.showSimple('Create Event: Successful');
            $scope.event = event;
            $scope.go('/events/' + $scope.event.id + '/overview');

        }, function (error) {
            if (error.error) {
                $mdToast.showSimple('Create Event Error: '+error.error);
            } else if (error.data && error.data.message){
                $mdToast.showSimple('Create Event Error: '+error.data.message);
            } else {
                $mdToast.showSimple('Create Event Error: Unknown');
                console.log(error);
            }
        });
    };

    //create(tokenKey, title, owner, paypal_email, startDateTime, endDateTime, checkIn);
});