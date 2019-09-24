const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Read = new Schema({
    read_author_name: {
        type: String
    },
    read_cover_i: {
        type: String
    },
    read_id_goodreads: {
        type: String
    },
    read_isbn: {
        type: String
    },
    read_title: {
        type: String
    }
});

module.exports = mongoose.model('Read', Read);