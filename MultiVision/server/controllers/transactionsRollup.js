/*
	Pivot by
	Year -> Month -> (Category + Product)
	Merchant -> Year -> Month -> (Category + Product)
	Category -> Year -> Month -> Product

	http://localhost:3030/api/transactionsrollup/category
	http://localhost:3030/api/transactionsrollup/category/2014
	http://localhost:3030/api/transactionsrollup/category/2014/7
	http://localhost:3030/api/transactionsrollup/merchant
	http://localhost:3030/api/transactionsrollup/merchant/2013
	http://localhost:3030/api/transactionsrollup/merchant/2014/7
*/
var TransactionsRollup = require('mongoose').model('TransactionsRollup');
var Transaction = require('mongoose').model('Transaction');

var getTransactionsRollup = function (req, res) {
	console.log("Inside getTransactionsRollup");
	console.log("req.params.type="+req.params.type);

	if (!req.params.type) {
		res.send("{'error': 'type parameter not specified in request URL'}");
	}

	Transaction.aggregate([
  		{ $project: {
        	id:1,
        	userId:1,
        	category: '$items.product.category.name',
        	merchant: '$merchant.name',
        	itemPrice: '$items.price'
  	}},
  	{ $unwind : '$category'},  	
  	{ $unwind : '$itemPrice'},
	{ $group: {
	        _id: {name: '$'+req.params.type+''},      
	      total: {$sum: '$itemPrice'},    
	      count: {$sum: 1 }
	}},
	{ $project: {_id:0, name: '$_id.name', total:1, count:1, type:{$literal:req.params.type}}},
	{ $sort : { "total" : -1} }
  ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log ("result.length = " + result.length);
        res.send(result);
    });
};

exports.getTransactionsRollup = getTransactionsRollup;

var getTransactionsRollupByYear = function (req, res) {
	console.log("Inside getTransactionsRollupByYear");
	console.log("req.params.type="+req.params.type);
	console.log("req.params.year="+req.params.year);

	if (!req.params.type || !req.params.year) {
		res.send("{'error': 'type or year parameter not specified in request URL'}");
	}

	var year = new Number(req.params.year);
	console.log(">>>>>>>>> year = " + year);

	Transaction.aggregate([
  		{ $project: {
        	id:1,
        	userId:1,
        	year: { $year: '$timestamp' },
        	category: '$items.product.category.name',
        	merchant: '$merchant.name',
        	itemPrice: '$items.price'
  	}},
  	{ $unwind : '$category'},  	
  	{ $unwind : '$itemPrice'},
  	{ $match: {"year" : + year} },
	{ $group: {
	        _id: {name: '$'+req.params.type+''},      
	      total: {$sum: '$itemPrice'},    
	      count: {$sum: 1 }
	}},
	{ $project: {_id:0, name: '$_id.name', total:1, count:1, type:{$literal:req.params.type}}},
	{ $sort : { "total" : -1} }
  ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(result);
    });
};

exports.getTransactionsRollupByYear = getTransactionsRollupByYear;


var getTransactionsRollupByMonth = function (req, res) {
	console.log("Inside getTransactionsRollupByMonth");
	console.log("req.params.type="+req.params.type);
	console.log("req.params.year="+req.params.year);
	console.log("req.params.month="+req.params.month);

	if (!req.params.type || !req.params.month || !req.params.year) {
		res.send("{'error': 'type, month or year parameter not specified in request URL'}");
	}

	var year = new Number(req.params.year);
	var month = new Number(req.params.month);

	Transaction.aggregate([
  		{ $project: {
        	id:1,
        	userId:1,
        	year: { $year: '$timestamp' },
        	month: { $month: "$timestamp" },
        	day: { $dayOfMonth: "$timestamp" },        	
        	category: '$items.product.category.name',
        	merchant: '$merchant.name',
        	itemPrice: '$items.price'
  	}},
  	{ $unwind : '$category'},  	
  	{ $unwind : '$itemPrice'},
  	{ $match: {"year" : + year} },
  	{ $match: {"month" : + month} },
	{ $group: {
	        _id: {year: '$year', month: '$month', day: '$day', name: '$'+req.params.type+''},      
	      total: {$sum: '$itemPrice'},    
	      count: {$sum: 1 }
	}},
	{ $project: {_id:0, year:"$_id.year", month:"$_id.month", day:"$_id.day", name: '$_id.name', total:1, count:1, type:{$literal:req.params.type}}},
	{ $sort : { "day" : 1} }
  ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(result);
    });
};

exports.getTransactionsRollupByMonth = getTransactionsRollupByMonth;

// exports.getTransactionById = function (req, res) {
//     Transaction.findOne({_id: req.params.id}).exec(function (err, transaction) {
//         res.send(transaction);
//     });
// };

// exports.getTransactionsRolledUpByMonths = function (req, res) {
// 	console.log("req.params.year="+req.params.year);
// 	console.log("req.params.month="+req.params.month);
// 	var startDate, endDate, month;

// 	if (!req.params.year) {
// 	    res.status(400);
// 	    return res.send({reason: "year missing in the query url"});
// 	}

// 	console.log("startDate: " +req.params.year + "-01-01T00:00:00.000Z");

// 	//startDate = new Date (req.params.year + "-01-01T00:00:00.000Z");
// 	startDate = new Date (req.params.year + "-01-01");

// 	if (req.params.month) {
// 		if (req.params.month < 1 || req.params.month > 12) {
// 		    res.status(400);
// 		    return res.send({reason: "invalid month in the query url"});
// 		}

// 		month = (req.params.month < 10) ? "0"+req.params.month : req.params.month;

// 	// endDate = new Date (req.params.year + "-"+month+"-31T00:00:00.000Z");
// 	startDate = new Date (req.params.year + "-"+month+"-01");
// 	endDate = new Date (req.params.year + "-"+month+"-31");

// 	} else {
// 		console.log("endDate: " +req.params.year + "-12-31T00:00:00.000Z");
// 		// endDate = new Date (req.params.year + "-12-31T00:00:00.000Z");
// 		endDate = new Date (req.params.year + "-12-31");
// 	}

// 	console.log("startDate: " + startDate);
// 	console.log("endDate: " + endDate);

// 	// equivalant mongo query
// 	//db.transactions.find( { $and:  [ {"timestamp":{$gte: ISODate("2014-01-01T00:00:00.000Z")}},  {"timestamp":{$lte: ISODate("2014-12-31T00:00:00.000Z")}}]});

//     Transaction.find({ $and:  [ {"timestamp":{$gte: startDate}},  {"timestamp":{$lte: endDate}}]}).exec(function (err, collection) {
//         if (err) {
//             res.status(400);
//     		console.log(err);
//             return res.send({reason: err.toString()});
//         }
//         res.send(collection);
//     });
// }