angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    console.log('in app.js');
    console.log('$routeProvider = ' + $routeProvider);
    console.log('$locationProvider = ' + $locationProvider);
    //$locationProvider.html5Mode(true);

    // Added to fix "$location in HTML5 mode requires a <base> tag to be present" error
    //https://docs.angularjs.org/error/$location/nobase

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $routeProvider.when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
    .when('/admin/users', {templateUrl: '/partials/admin/user-list', controller: 'mvUserListCtrl'});
});

