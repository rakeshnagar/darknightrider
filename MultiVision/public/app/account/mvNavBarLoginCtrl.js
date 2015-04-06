angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http) {

    $scope.signin = function (username, password) {
        console.log('username=' + username + ' password= ' + password);

        $http.post('/login', {username: username, password: password}).then(function (response) {
            if (response.data.success) {
                console.log('login successful...');
            } else {
                console.log('login failed...');
            }
        });
    }
})