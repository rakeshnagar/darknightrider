angular.module('app').factory('mvTransactionsRollup', function ($resource) {

    var TransactionsRollupResource = $resource('/api/transactionsrollup/:_id', {id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return TransactionsRollupResource;
});