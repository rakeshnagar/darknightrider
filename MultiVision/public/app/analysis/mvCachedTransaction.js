angular.module('app').factory('mvCachedTransaction', function (mvTransaction) {

    var transactionList;

    return {
        query: function () {
            if (!transactionList) {
                transactionList = mvTransaction.query();
            }
            return transactionList;
        }
    }
});