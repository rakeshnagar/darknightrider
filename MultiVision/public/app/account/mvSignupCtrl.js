angular.module('app').controller('mvSignupCtrl', function ($scope, mvUser, mvNotifier, mvAuth, $location) {
    $scope.signup = function () {
        console.log('In signup');

        var newUserData = {
            username:  $scope.email,
            password:  $scope.password,
            firstName: $scope.fname,
            lastName:  $scope.lname
        };

        mvAuth.createUser(newUserData).then(function () {
            mvNotifier.notify('User account created');
            $location.path('/');
        }, function (reason) {
            mvNotifier.notifyFailure(reason);
        });
    }
})
