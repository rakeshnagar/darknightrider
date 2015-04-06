//returns an object
angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q) {
    return {
        authenticateUser: function (username, password) {

            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    mvIdentity.currentUser = response.data.user;
                    //mvNotifier.notify('You have successfully signed in!!');
                    console.log('login successful...');
                    dfd.resolve(true);
                } else {
                    //mvNotifier.notifyFailure('Username/password combination is incorrect');
                    console.log('login failed...');
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        }
    };
});