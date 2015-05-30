var mongoose = require('mongoose');

var transactionsRollupSchema = mongoose.Schema({
    name: {type: String, required: '{PATH} is required!'},
    type: {type: String, required: '{PATH} is required!'},
    totalAmount: {type: Number, required: '{PATH} is required!'},
    transactionCount: {type: Number, required: '{PATH} is required!'},
    year: {type: Number, required: '{PATH} is required!'},
    month: {type: Number, required: '{PATH} is required!'},
    day: {type: Number, required: '{PATH} is required!'}
});

var TransactionsRollup = mongoose.model('TransactionsRollup', transactionsRollupSchema);