var bookshelf= require("../config/bookshelf");
const {UserFiles} = require("./Files");


var Users = bookshelf.Model.extend({
    tableName: 'users',
    files: function() {
        return this.hasMany(UserFiles);
    }
});

module.exports.Users = Users;


