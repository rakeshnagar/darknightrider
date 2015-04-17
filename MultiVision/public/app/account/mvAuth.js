//returns an object
angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function (username, password) {

            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);

                    mvIdentity.currentUser = user;
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
        },

        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },

        authorizeCurrentUserForRoute: function (role) {
            if (mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    };
});