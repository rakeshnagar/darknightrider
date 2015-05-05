/* with caching */
angular.module('app').controller('mvCourseDetailsCtrl', function ($scope, mvCachedCourse, $routeParams) {
    mvCachedCourse.query().$promise.then(function (collection) {
        collection.forEach(function (course) {
            if (course._id === $routeParams.id) {
                $scope.course = course;
            }
        });
    });
});


/* without caching */
//angular.module('app').controller('mvCourseDetailsCtrl', function ($scope, mvCourse, $routeParams) {
//
//    $scope.course = mvCourse.get({_id: $routeParams.id});
//});