//http://bjorn.tipling.com/maps-sets-and-iterators-in-javascript

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


    $scope.tiles = [
                    {
                        "heading": "Root",
                        "type":"year",
                        "tiles": [
                            {
                                "title": "2015",
                                "total": "350"
                            },
                            {
                                "title": "2014",
                                "total": "200"
                            }
                        ]
                    }
                ];

$scope.expand = function (id, clickedOn) { 
    var months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log("expand clicked id="+id);
    console.log("expand clicked type="+clickedOn);

    //console.log("transactions >>>>>>>> " + $scope.transactions);
    var tileGroup;
    var tileGroups = [];
    var tiles = [];
    var filteredTransactions = [];
    var map = new Map();
    var year, month, date, catagory;
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
            "type": "catagory",
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
                        catagory = item.product.catagory;

                        if (map.has(catagory)) {
                            map.set(catagory, (map.get(catagory) + item.price));
                        } else {
                           map.set(catagory, item.price);
                        }
                    });
                }
             });

            map.forEach(function (total, catagory) {
                tile = {
                            "title": catagory,
                            "total": total
                            //"leaf": false
                        };

                tiles.push(tile);                              
            });
        }

        tileGroup.tiles = tiles;
    } 

    if (clickedOn === "catagory") {
        console.log ("processing catagory..."); 

        $scope.catagory=id;
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
                        catagory = item.product.catagory;

                    if (catagory === id) {
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
                "heading":$scope.catagory, 
                "type":"catagory"}
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
                        if (item.product.catagory === $scope.catagory) {
                            filteredTransactions.push(entry);
                            return true;
                        }
                        });
                    // entry.items.forEach(function(item) {
                    //     catagory = item.product.catagory;

                    //     if (catagory === $scope.catagory) {
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

    $scope.tiles = tileGroups;

}               

});