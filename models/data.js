const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    text : {
        type : String,
        required : true
    },
    username : String,
    password : String
},{timestamps : true});

const Data = mongoose.model('node-js', dataSchema);

module.exports = Data;
