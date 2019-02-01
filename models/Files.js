var bookshelf = require("../config/bookshelf");

var UserFiles = bookshelf.Model.extend({
    tableName: 'files',
});

module.exports.UserFiles = UserFiles;