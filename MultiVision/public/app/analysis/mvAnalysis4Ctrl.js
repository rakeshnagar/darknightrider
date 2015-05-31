// http://stackoverflow.com/questions/5643321/how-to-make-remote-rest-call-inside-node-js-any-curl
angular.module('app').controller('mvAnalysis4Ctrl', function($scope,
                                    mvTransactionsRollupByType, 
                                    mvTransactionsRollupByTypeYear, 
                                    mvTransactionsRollupByTypeYearMonth) {

// console.log('http >> ' + $http);

// console.log("mvTransactionsRollupByType = " + mvTransactionsRollupByType);
// var transactionsRollupByType;

mvTransactionsRollupByType.query({type: "category"}).$promise.then(function (collection) {
    console.log (collection);
    $scope.transactionsRollupByCategory = collection;
});

mvTransactionsRollupByType.query({type: "merchant"}).$promise.then(function (collection) {
    console.log (collection);
    $scope.transactionsRollupByMerchant = collection;
});

mvTransactionsRollupByTypeYear.query({type: "category", year: 2013}).$promise.then(function (collection) {
    console.log (collection);
    $scope.transactionsRollupByCategoryYear = collection;
});

mvTransactionsRollupByTypeYear.query({type: "merchant", year: 2013}).$promise.then(function (collection) {
    console.log (collection);
    $scope.transactionsRollupByMerchantYear = collection;
});

mvTransactionsRollupByTypeYearMonth.query({type: "category", year: 2014, month: 2}).$promise.then(function (collection) {
    console.log (collection);
    $scope.transactionsRollupByCategoryYearMonth = collection;
});

mvTransactionsRollupByTypeYearMonth.query({type: "merchant", year: 2014, month: 2}).$promise.then(function (collection) {
    console.log (collection);
    $scope.transactionsRollupByMerchantYearMonth = collection;
});

var month = (new Date()).getMonth();
var year = (new Date()).getFullYear();

$scope.month = month;
$scope.year = year;

// console.log("request = " + request);
});