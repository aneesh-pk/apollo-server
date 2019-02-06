const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/userDoc');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function () { });

const Schema = mongoose.Schema;

const FileSchema = new Schema({
    id: Number,
    file: String
});

var FBlob = mongoose.model('FileBlob', FileSchema);

module.exports = {
    db,
    FBlob
}