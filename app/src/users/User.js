var bookshelf= require("../config/bookshelf");
const {UserFile} = require("../userFiles/UserFile");

var User = bookshelf.Model.extend({
    tableName: 'users',
    files: function() {
        return this.hasMany(UserFile);
    }
});

module.exports.User = User;


