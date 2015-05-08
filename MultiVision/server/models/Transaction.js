var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({
    id: {type: String, required: '{PATH} is required!'},
    userId: {type: String, required: '{PATH} is required!'},
    timestamp: {type: Date, required: '{PATH} is required!'},
    merchant: {
        code: {type: String, required: '{PATH} is required!'},
        name: {type: String, required: '{PATH} is required!'},
        location: {type: String, required: '{PATH} is required!'}
    },
    serviceType: {type: String, required: '{PATH} is required!'},
    transactionType: {type: String, required: '{PATH} is required!'},    
    totalAmount: {type: Number, required: '{PATH} is required!'},
    items: [{ product: {
                    code: {type: String, required: '{PATH} is required!'},
                    name: {type: String, required: '{PATH} is required!'},
                    catagory: {type: String, required: '{PATH} is required!'}
                },
               unitPrice: {type: Number, required: '{PATH} is required!'},
               qualtity: {type: Number, required: '{PATH} is required!'},
               price: {type: Number, required: '{PATH} is required!'},
               currency: {type: String, required: '{PATH} is required!'}
    }]
});


var Transaction = mongoose.model('Transaction', transactionSchema);

function createDefaultTransactions() {
    console.log('Inside createDefaultTransactions...');
    Transaction.find({}).exec(function (err, collection) {
        console.log('Inside createDefaultTransactions...' + collection.length);
        console.log('Inside createDefaultTransactions...' + err);

      //  if (collection.length === 0) {
        
            console.log('Inside createDefaultTransactions... adding');
            
            var transaction = new Transaction(
                {
                   "id":"id1",
                   "userId":"rakesh",
                   "timestamp":Date.now(),
                   "merchant":{
                      "code":"M12345",
                      "name":"Macys",
                      "location":"BalstonMall"
                   },
                   "serviceType":"Goods",
                   "transactionType":"InStore",
                   "totalAmount":"50",
                   "items":[
                      {
                         "product":{
                            "code":"cd1",
                            "name":"name1",
                            "catagory":"cat1"
                         },
                         "unitPrice":10,
                         "qualtity":3,
                         "price":30,
                         "currency":"USD"
                      },
                      {
                         "product":{
                            "code":"cd2",
                            "name":"name2",
                            "catagory":"cat2"
                         },
                         "unitPrice":20,
                         "qualtity":1,
                         "price":20,
                         "currency":"USD"
                      }
                   ]
                });

            transaction.save(function (err) {
                console.log(err);                                
            });
            
        console.log('Inside createDefaultTransactions... adding - done');

       // }
    });
}

exports.createDefaultTransactions = createDefaultTransactions;