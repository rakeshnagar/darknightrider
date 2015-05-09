//http://bjorn.tipling.com/maps-sets-and-iterators-in-javascript

angular.module('app').controller('mvAnalysisCtrl', function($scope, mvTransaction) {

    var transactions;

    mvTransaction.query().$promise.then(function (collection) {         
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
                        "type":"root",
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
    var tileGroups = [];

    if (!clickedOn || clickedOn === "root") {
        console.log ("processing root...");

        var tileGroup = {
            "heading": "Root",
            "type": "year",
            "parent": {
                "heading":"root", 
                "type":"root"}
        };
        
        tileGroups.push(tileGroup);
        var tiles = [];
        var map = new Map();
        var year, date;

        if ($scope.transactions) {
            $scope.transactions.forEach(function(entry) {
                console.log(entry);
                date = new Date(entry.timestamp);                
                year = date.getFullYear();

                if (map.has(year)) {
                    map.set(year, (map.get(year) + entry.totalAmount));
                } else {
                   map.set(year, entry.totalAmount);
                }
            });

            console.log(map);

            map.forEach(function (total, year) {
                var tile = {
                            "title": year,
                            "total": total
                        };
                tiles.push(tile);              
            });
        }

        tileGroup.tiles = tiles;
    }

    if (clickedOn === "year") {
        console.log ("processing year...");        
        var tileGroup = {
            "heading": id,
            "type": "month",
            "parent": {
                "heading":"root", 
                "type":"root"}
        };
        
        tileGroups.push(tileGroup);
        var tiles = [];

        if ($scope.transactions) {
            $scope.transactions.forEach(function(entry) {
                console.log(entry);
                var date = new Date(entry.timestamp);
                console.log(date.getFullYear());
                console.log(months[date.getMonth()]);

                 if (date.getFullYear() == id) {
                    console.log ("Found " + id);

                    var tile = {
                                "title": months[date.getMonth()],
                                "total": "250"
                            };
                    tiles.push(tile);
                 }
            });
        }

        tileGroup.tiles = tiles;
    }    

    console.log(JSON.stringify(tileGroups));

    $scope.tiles = tileGroups;
    
    // $scope.tiles1 = [
    //                 {
    //                     "heading": "xxx",
    //                     "type":"month",
    //                     "tiles": [
    //                         {
    //                             "title": "January",
    //                             "total": "250"
    //                         },
    //                         {
    //                             "title": "Feburary",
    //                             "total": "350"
    //                         }
    //                     ]
    //                 }
    //             ];
}               

});