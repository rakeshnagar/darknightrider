angular.module('app', ['ngResource', 'ngRoute']);

//http://www.ng-newsletter.com/posts/d3-on-angular.html
//angular.module('d3', []).factory('d3Service', [function(){
//    var d3;
//    // insert d3 code here
//    return d3;
// }];

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
            controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin})
        .when('/signup', {templateUrl: '/partials/account/signup',
            controller: 'mvSignupCtrl'})
        .when('/profile', {templateUrl: '/partials/account/profile',
            controller: 'mvProfileCtrl', resolve: routeRoleChecks.user})
        .when('/courses', {templateUrl: '/partials/courses/course-list',
            controller: 'mvCourseListCtrl'})
        .when('/analyze', {templateUrl: '/partials/analysis/analyze',
            controller: 'mvAnalysisCtrl'})
        .when('/analyze2', {templateUrl: '/partials/analysis/analyze2',
            controller: 'mvAnalysisCtrl'})
        .when('/analyze3', {templateUrl: '/partials/analysis/analyze3',
            controller: 'mvAnalysisCtrl'})
        .when('/graph1', {templateUrl: '/partials/analysis/graph1',
            controller: 'mvAnalysisGraphCtrl'})
        .when('/courses/:id', {templateUrl: '/partials/courses/course-details',
            controller: 'mvCourseDetailsCtrl'});
});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {

        if (rejection === 'not authorized') {
            $location.path('/');
            /* redirect to home page*/
        }
    });
});