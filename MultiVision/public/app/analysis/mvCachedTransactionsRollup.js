angular.module('app').factory('mvCachedTransactionsRollup', function (mvTransactionsRollup) {

    var transactionList;

    return {
        query: function () {
            if (!transactionList) {
                transactionList = mvTransactionsRollup.query();
            }
            return transactionList;
        }
    }
});