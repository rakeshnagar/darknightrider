angular.module('app').factory('mvCourse', function ($resource) {

    var CourseResource = $resource('/api/courses/:_id', {id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return CourseResource;
});