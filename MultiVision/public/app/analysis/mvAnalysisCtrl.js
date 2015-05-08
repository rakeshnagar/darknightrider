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


});