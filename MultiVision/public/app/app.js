angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            /* only allow admin uses to access this link */
            auth: function (mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('admin');
            }
        },
        user: {
            auth: function (mvAuth) {
                return mvAuth.authorizeAuthenticatedUserForRoute();
            }
        }
    };

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

    $routeProvider
        .when('/', {templateUrl: '/partials/main/main',
            controller: 'mvMainCtrl'})
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
        })
        .when('/signup', {templateUrl: '/partials/account/signup',
            controller: 'mvSignupCtrl'})
        .when('/profile', {templateUrl: '/partials/account/profile',
            controller: 'mvProfileCtrl', resolve: routeRoleChecks.user});
});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {

        if (rejection === 'not authorized') {
            $location.path('/');
            /* redirect to home page*/
        }
    });
});