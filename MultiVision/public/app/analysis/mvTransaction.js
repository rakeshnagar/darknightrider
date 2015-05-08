angular.module('app').factory('mvTransaction', function ($resource) {

    var TransactionResource = $resource('/api/transactions/:_id', {id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return TransactionResource;
});