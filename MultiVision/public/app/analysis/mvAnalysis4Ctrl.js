// http://stackoverflow.com/questions/5643321/how-to-make-remote-rest-call-inside-node-js-any-curl
angular.module('app').controller('mvAnalysis4Ctrl', function($scope, $http, mvCachedTransaction) {

console.log('http >> ' + $http);

 var month = (new Date()).getMonth();
 
 var year = (new Date()).getFullYear();

$scope.month = month;
$scope.year = year;

});