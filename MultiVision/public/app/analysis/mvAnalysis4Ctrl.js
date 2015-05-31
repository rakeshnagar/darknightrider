// http://stackoverflow.com/questions/5643321/how-to-make-remote-rest-call-inside-node-js-any-curl
angular.module('app').controller('mvAnalysis4Ctrl', function($scope, $q,
                                    mvTransactionsRollupByType, 
                                    mvTransactionsRollupByTypeYear, 
                                    mvTransactionsRollupByTypeYearMonth) {

mvTransactionsRollupByType.query({type: "category"}).$promise.then(function (collection) {
    // console.log (collection);
    $scope.transactionsRollupByCategory = collection;
});

mvTransactionsRollupByType.query({type: "merchant"}).$promise.then(function (collection) {
    // console.log (collection);
    $scope.transactionsRollupByMerchant = collection;
});

mvTransactionsRollupByTypeYear.query({type: "category", year: 2013}).$promise.then(function (collection) {
    // console.log (collection);
    $scope.transactionsRollupByCategoryYear = collection;
});

mvTransactionsRollupByTypeYear.query({type: "merchant", year: 2013}).$promise.then(function (collection) {
    // console.log (collection);
    $scope.transactionsRollupByMerchantYear = collection;
});

mvTransactionsRollupByTypeYearMonth.query({type: "category", year: 2014, month: 2}).$promise.then(function (collection) {
    // console.log (collection);
    $scope.transactionsRollupByCategoryYearMonth = collection;
});

mvTransactionsRollupByTypeYearMonth.query({type: "merchant", year: 2014, month: 2}).$promise.then(function (collection) {
    // console.log (collection);
    $scope.transactionsRollupByMerchantYearMonth = collection;
});

var month = (new Date()).getMonth();
var year = (new Date()).getFullYear();

$scope.month = month;
$scope.year = year;

c3.generate({
    bindto: '#chart123',
    data: {
      columns: [
        ['data1', 130, 2100, 100, 400, 150, 250],
        ['data2', 250, 202, 10, 40, 15, 25]
      ]
    }
});

function doQuery(intype) {
   var d = $q.defer();

   mvTransactionsRollupByType.query({type: intype}, function(collection) {
    d.resolve(collection);
    console.log ("doQuery >> result >> " +collection);
    $scope.xxx=collection;
   });

   return d.promise;
}

$scope.getDataAndConfirm = function() {
    console.log("getDataAndConfirm");

    $q.all(doQuery("category")).then(function(output){
        console.log("$q.all");
        console.log(output);
    });

    console.log("getDataAndConfirm - done");
}

$scope.$watch("xxx", function() {
    if ($scope.xxx) {
        console.log("xxx changed");

        var dataArray = [];
        $scope.xxx.forEach(function(entry) {
            dataArray.push([entry.name, Math.round(entry.total)]);            
        });
        console.log(dataArray);
        
        c3.generate({
            bindto: '#piechart123',
            data: {
                columns: dataArray,
                type: 'pie'
            },
            pie: {
                label: {
                    format: function (value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });

        c3.generate({
            bindto: '#donutchart123',
            data: {
                columns:dataArray,
                type : 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            donut: {
                title: "Iris Petal Width"
            }
        });


    }
});

$scope.getDataAndConfirm1 = function() {
    console.log("getDataAndConfirm");
    var intype = "category";

    var d = $q.defer();
    mvTransactionsRollupByType.query({type: intype}, d.resolve);

    d.promise.then(function(data) {
        console.log(data);
    });

    console.log("getDataAndConfirm - done");
}


var getDate = function() {
    var dataArray = [];
    var i = 1;
    console.log(i++);

    $q.all( //doQuery("category")        
        [mvTransactionsRollupByType.query({type: "category"})]

        /*.$promise.then(function (collection) {
            console.log(i++);
            collection.forEach(function(entry) {
                console.log(i++);
                dataArray.push([entry.name, 10]);            
                console.log(i++);
            });
            console.log(i++);
            console.log(dataArray);
            console.log([['data1', 30], ['data2', 50], ['data3', 113]]);        
        }*/

        ).then(function (data) {
            console.log("Q.ALL >> " + data);
            console.log(data[0]);
            data[0].$promise.then(function(coll){

                    coll.forEach(function(entry) {
                        console.log(entry);
                        console.log(i++);
                    })
                console.log("returning " + dataArray);
                return dataArray;
            });
    });

    //dataArray = [['data1', 30], ['data2', 50], ['data3', 113], ['data4', 113], ['data5', 113], ['data6', 113], ['data7', 113], ['data8', 113], ['data9', 113], ['data10', 113], ["data11", 113]];
    // console.log(i++);
    // console.log("returning dataArray >> " + dataArray);
    // return dataArray;
}

$scope.showPieChart = function() {
    c3.generate({
        bindto: '#piechart123',
        data: {
            columns: 
            // [
                // ['data1', 30],
                // ['data2', 50]
            // ]
            getDate()
            ,
            type: 'pie'
        },
        pie: {
            label: {
                format: function (value, ratio, id) {
                    return d3.format('$')(value);
                }
            }
        }
    });
}

c3.generate({
    bindto: '#donutchart123',
    data: {
        columns: /*getDate(),*/
        [
            ['data1', 30],
            ['data2', 120]
        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Iris Petal Width"
    }
});

$scope.showChart = function() {
    console.log('got it...');
    console.log(c3);

    c3.generate({
    bindto: '#chart123',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    }
});
}

// console.log("request = " + request);
});