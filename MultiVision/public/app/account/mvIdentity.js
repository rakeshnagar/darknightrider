angular.module('app').factory('mvIdentity', function ($window, mvUser) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }

    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
            /*
             !! --> http://stackoverflow.com/questions/784929/what-is-the-not-not-operator-in-javascript
            */
        },
        isAuthorized: function (role) {
            return !!(this.currentUser && this.currentUser.roles.indexOf(role) > -1);
        }
    }
});