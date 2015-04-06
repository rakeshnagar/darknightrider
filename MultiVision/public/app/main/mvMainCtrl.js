angular.module('app').controller('mvMainCtrl', function ($scope) {
    console.log('in app.js - mvMainCtrl');
    //$scope.myVar = "Hello Angular";

    $scope.courses = [
        {name: 'First Course', featured: true, published: new Date("October 13, 2013 11:13:00")},
        {name: 'Second Course', featured: false, published: new Date("July 1, 2014 10:23:00")},
        {name: 'Third Course', featured: true, published: new Date("January 15, 2015 10:23:00")}
    ];
});