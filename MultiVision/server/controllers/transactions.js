/*
	Pivot by
	Year -> Month -> (Category + Product)
	Merchant -> Year -> Month -> (Category + Product)
	Category -> Year -> Month -> Product

*/
var Transaction = require('mongoose').model('Transaction');

var getTransactions = function (req, res) {
	console.log("Inside getTransactions");
    Transaction.find({}).exec(function (err, collection) {
    	console.log("Inside getTransactions collection size = " + collection.length);
        res.send(collection);
    });
};

exports.getTransactions = getTransactions;

exports.getTransactionById = function (req, res) {
    Transaction.findOne({_id: req.params.id}).exec(function (err, transaction) {
        res.send(transaction);
    });
};

exports.getTransactionsRolledUpByMonths = function (req, res) {
	console.log("req.params.year="+req.params.year);
	console.log("req.params.month="+req.params.month);
	var startDate, endDate, month;

	if (!req.params.year) {
	    res.status(400);
	    return res.send({reason: "year missing in the query url"});
	}
	
	console.log("startDate: " +req.params.year + "-01-01T00:00:00.000Z");

	//startDate = new Date (req.params.year + "-01-01T00:00:00.000Z");
	startDate = new Date (req.params.year + "-01-01");

	if (req.params.month) {
		if (req.params.month < 1 || req.params.month > 12) {
		    res.status(400);
		    return res.send({reason: "invalid month in the query url"});
		}

		month = (req.params.month < 10) ? "0"+req.params.month : req.params.month;
	
	// endDate = new Date (req.params.year + "-"+month+"-31T00:00:00.000Z");
	startDate = new Date (req.params.year + "-"+month+"-01");
	endDate = new Date (req.params.year + "-"+month+"-31");

	} else {
		console.log("endDate: " +req.params.year + "-12-31T00:00:00.000Z");
		// endDate = new Date (req.params.year + "-12-31T00:00:00.000Z");
		endDate = new Date (req.params.year + "-12-31");
	}

	console.log("startDate: " + startDate);
	console.log("endDate: " + endDate);

	// equivalant mongo query	
	//db.transactions.find( { $and:  [ {"timestamp":{$gte: ISODate("2014-01-01T00:00:00.000Z")}},  {"timestamp":{$lte: ISODate("2014-12-31T00:00:00.000Z")}}]});

    Transaction.find({ $and:  [ {"timestamp":{$gte: startDate}},  {"timestamp":{$lte: endDate}}]}).exec(function (err, collection) {
        if (err) {
            res.status(400);
    		console.log(err);
            return res.send({reason: err.toString()});
        }    	
        res.send(collection);
    });	
}