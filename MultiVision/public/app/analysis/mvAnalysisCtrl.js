//http://bjorn.tipling.com/maps-sets-and-iterators-in-javascript
// Chart Examples
//http://dc-js.github.io/dc.js/examples/cust.html
//http://frozen-hollows-5121.herokuapp.com/
//http://www.jasondavies.com/coffee-wheel/
// https://live.zoomdata.com/zoomdata/visualization#
// http://bl.ocks.org/kerryrodden/477c1bfb081b783f80ad

angular.module('app').controller('mvAnalysisCtrl', function($scope, mvCachedTransaction) {

    var transactions;

    mvCachedTransaction.query().$promise.then(function (collection) {
        $scope.transactions = collection
    });

    $scope.yearly = {
        January: 1034,
        Feburary: 4500,
        March: 3450,
        April: 40340,
        May: 4540,
        June: 540,
        July: 5430,
        August: 430,
        September: 3300,
        October: 3420,
        November: 4320,
        December: 3240
    };

    $scope.categoryList =
                            [
                                {
                                    "id": 1,
                                    "parentId": 0,
                                    "level": 1,
                                    "title": "Cat1",
                                    "total": 12341,
                                    "sub-categories": [
                                        {
                                            "id": 11,
                                            "parentId": 1,
                                            "level": 2,
                                            "title": "Cat1.1",
                                            "total": 270,
                                            "sub-categories": [
                                                {
                                                    "id": 111,
                                                    "parentId": 11,
                                                    "level": 3,
                                                    "title": "Cat1.1.1",
                                                    "total": 50,
                                                    "sub-categories": [],
                                                    "line-items": [
                                                        {
                                                            "name": "Item 1",
                                                            "unit-price": "$10/pound",
                                                            "units": 1,
                                                            "time": "new Date()",
                                                            "price": 10,
                                                            "currency": "USD"
                                                        },
                                                        {
                                                            "name": "Item 2",
                                                            "unit-price": "$20/pound",
                                                            "units": 2,
                                                            "time": "new Date()",
                                                            "price": 40,
                                                            "currency": "USD"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "id": 112,
                                                    "parentId": 11,
                                                    "level": 3,
                                                    "title": "Cat1.1.2",
                                                    "total": 220,
                                                    "sub-categories": [],
                                                    "line-items": [
                                                        {
                                                            "name": "Item 3",
                                                            "unit-price": "$5/pound",
                                                            "units": 4,
                                                            "time": "new Date()",
                                                            "price": 20,
                                                            "currency": "USD"
                                                        },
                                                        {
                                                            "name": "Item 4",
                                                            "unit-price": "$100/pound",
                                                            "units": 2,
                                                            "time": "new Date()",
                                                            "price": 200,
                                                            "currency": "USD"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": 2,
                                    "parentId": 0,
                                    "level": 1,
                                    "title": "Cat2",
                                    "total": 12342,
                                    "sub-categories": []
                                },
                                {
                                    "id": 3,
                                    "parentId": 0,
                                    "level": 1,
                                    "title": "Cat3",
                                    "total": 12343,
                                    "sub-categories": []
                                },
                                {
                                    "id": 4,
                                    "parentId": 0,
                                    "level": 1,
                                    "title": "Cat4",
                                    "total": 12344,
                                    "sub-categories": []
                                }
                            ];


    //$scope.chartdata="2015:40,2014:14,2013:55";
    $scope.tiles = [
                    {
                        "heading": "Root",
                        "type":"year",
                        "tiles": [
                            {
                                "title": "2015",
                                "total": "??"
                            },
                            {
                                "title": "2014",
                                "total": "??"
                            },
                            {
                                "title": "2013",
                                "total": "??"
                            }                            
                        ]
                    }
                ];

$scope.expand = function (id, clickedOn) {
    var months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log("expand clicked id="+id);
    console.log("expand clicked type="+clickedOn);

    //console.log("transactions >>>>>>>> " + $scope.transactions);
    var chartdata;
    var tileGroup;
    var tileGroups = [];
    var tiles = [];
    var filteredTransactions = [];
    var map = new Map();
    var year, month, date, category;
    var tile;
    // $scope.year=null;
    // $scope.month=null;
    // $scope.category=null;

    if (!clickedOn || clickedOn === "root") {
        console.log ("processing root...");

        tileGroup = {
            "heading": "Root",
            "type": "year",
            "parent": {
                "heading":"root",
                "type":"root"}
        };

        tileGroups.push(tileGroup);

        if ($scope.transactions) {
            $scope.transactions.forEach(function(entry) {
                date = new Date(entry.timestamp);
                year = date.getFullYear();

                if (map.has(year)) {
                    map.set(year, (map.get(year) + entry.totalAmount));
                } else {
                   map.set(year, entry.totalAmount);
                }
            });

            map.forEach(function (total, year) {
                tile = {
                            "title": year,
                            "total": total
                            //"leaf": false
                        };
                tiles.push(tile);
            });
        }

        tileGroup.tiles = tiles;
    }

    if (clickedOn === "year") {
        $scope.year=id;
        console.log ("processing year...");
        tileGroup = {
            "heading": id,
            "type": "month",
            "parent": {
                "heading":"root",
                "type":"root"}
        };

        tileGroups.push(tileGroup);

        if ($scope.transactions) {

            $scope.transactions.forEach(function(entry) {
                // console.log("transaction >>>>>>>>>> " + JSON.stringify(entry));

                date = new Date(entry.timestamp);

                 if (date.getFullYear() == id) {
                    month = months[date.getMonth()];

                    if (map.has(month)) {
                        map.set(month, (map.get(month) + entry.totalAmount));
                    } else {
                       map.set(month, entry.totalAmount);
                    }
                }
             });

            map.forEach(function (total, month) {
                tile = {
                            "title": month,
                            "total": total
                            //"leaf": false
                        };

                tiles.push(tile);
            });
        }

        tileGroup.tiles = tiles;
    }


    if (clickedOn === "month") {
        console.log ("processing month...");

        $scope.month=id;
        tileGroup = {
            "heading": id,
            "type": "category",
            "parent": {
                "heading":$scope.year,
                "type":"year"}
        };

        tileGroups.push(tileGroup);

        if ($scope.transactions) {

            $scope.transactions.forEach(function(entry) {
                date = new Date(entry.timestamp);
                month = months[date.getMonth()];

                 if ((date.getFullYear() == $scope.year) && (month == id)) {
                    entry.items.forEach(function(item) {

                        // console.log("item >>>>>>>>>> " + JSON.stringify(item));
                        category = item.product.category.name;

                        if (map.has(category)) {
                            map.set(category, (map.get(category) + item.price));
                        } else {
                           map.set(category, item.price);
                        }
                    });
                }
             });

            map.forEach(function (total, category) {
                tile = {
                            "title": category,
                            "total": total
                            //"leaf": false
                        };

                tiles.push(tile);
            });
        }

        tileGroup.tiles = tiles;
    }

    if (clickedOn === "category") {
        console.log ("processing category...");

        $scope.category=id;
        tileGroup = {
            "heading": id,
            "type": "items",
            "parent": {
                "heading":$scope.month,
                "type":"month"}
        };

        tileGroups.push(tileGroup);

        if ($scope.transactions) {

            $scope.transactions.forEach(function(entry) {
                date = new Date(entry.timestamp);
                month = months[date.getMonth()];

                 if ((date.getFullYear() == $scope.year) && (month === $scope.month)) {
                    entry.items.forEach(function(item) {
                        // console.log(JSON.stringify(item));
                        category = item.product.category.name;

                    if (category === id) {
                        tile = {
                            "title": item.product.name,
                            "total": item.price,
                            "leaf": false
                        };
                        tiles.push(tile);
                    }
                    });
                }
             });
        }

        tileGroup.tiles = tiles;
    }

    if (clickedOn === "items") {
        console.log ("processing item...");

        $scope.item=id;
        tileGroup = {
            "heading": id,
            "type": "item",
            "parent": {
                "heading":$scope.category,
                "type":"category"}
        };

        tileGroups.push(tileGroup);

        if ($scope.transactions) {

            // tile = {
            //     "title": "xxx",
            //     "total": "xxx",
            //     "leaf": true
            // };
            // tiles.push(tile);


            $scope.transactions.forEach(function(entry) {
                date = new Date(entry.timestamp);
                month = months[date.getMonth()];

                 if ((date.getFullYear() == $scope.year) && (month === $scope.month)) {

                     entry.items.some(function(item) {
                        if (item.product.category.name === $scope.category) {
                            filteredTransactions.push(entry);
                            return true;
                        }
                        });
                    // entry.items.forEach(function(item) {
                    //     category = item.product.category;

                    //     if (category === $scope.category) {
                    //         transactions.push(entry);
                    //     }
                    // });
                }
             });

            $scope.filteredTransactions = filteredTransactions;

            console.log("filteredTransactions >> " +JSON.stringify(filteredTransactions));
        }

        tileGroup.tiles = tiles;
    }


    console.log(JSON.stringify(tileGroups));

    console.log(JSON.stringify(tileGroups[0].tiles));
    // alert(chartdata);
    // $scope.chartdata=chartdata;
    $scope.tiles = tileGroups;

    var grandTotal=0;
    $scope.tiles[0].tiles.forEach(function(entry) {
        console.log(JSON.stringify(entry));
        grandTotal += entry.total;
    });

    console.log(grandTotal);

    chartdata="";
    $scope.tiles[0].tiles.forEach(function(entry) {
        chartdata += (entry.title +":" +(entry.total * 100/grandTotal)) +",";
        //console.log (entry.title +":" +(entry.total * 100/grandTotal));
    });

    chartdata = chartdata.substring(0, chartdata.length-1);
    console.log ("chartdata = " + chartdata);
    $scope.chartdata=chartdata;
}
});