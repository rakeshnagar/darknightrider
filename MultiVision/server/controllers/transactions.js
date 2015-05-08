var Transaction = require('mongoose').model('Transaction');

exports.getTransactions = function (req, res) {
	console.log("Inside getTransactions");
    Transaction.find({}).exec(function (err, collection) {
    	console.log("Inside getTransactions collection size = " + collection.length);
        res.send(collection);
    });
};

exports.getTransactionById = function (req, res) {
    Transaction.findOne({_id: req.params.id}).exec(function (err, course) {
        res.send(course);
    });
}