var bookshelf = require("../config/bookshelf");

var UserFile = bookshelf.Model.extend({
    tableName: 'files',
});

module.exports.UserFile = UserFile;