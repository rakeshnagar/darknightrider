var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: {type: String, required: '{PATH} is required!'},
    hashed_pwd: {type: String, required: '{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash, username;

            username = 'rakesh';
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, username);

            User.create({
                firstName: 'Rakesh',
                lastName: 'Nagar',
                username: username,
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });

            username = 'joe';
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, username);

            User.create({
                firstName: 'Joe',
                lastName: 'Traders',
                username: username,
                salt: salt,
                hashed_pwd: hash,
                roles: []
            });
        }
    })
};

exports.createDefaultUsers = createDefaultUsers;