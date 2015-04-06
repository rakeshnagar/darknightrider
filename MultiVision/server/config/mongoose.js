var mongoose = require('mongoose');
var crypto = require('crypto');

module.exports = function (config) {

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash, username;
            username = 'rakesh';
            salt = createSalt();
            hash = hashPwd(salt, username);

            User.create({firstName: 'Rakesh', lastName: 'Nagar', username: username, salt: salt, hashed_pwd: hash});
        }
    });

    function createSalt() {
        return crypto.randomBytes(128).toString('base64');
    }

    function hashPwd(salt, password) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(password).digest('hex');
    }
}