'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Room'
const COLLECTION_NAME = 'rooms'

// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema({
    room_name:{
        type:String,
        required:true,
        index:true,
    },
    room_menbers:{
        type:Array,
    },
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, roomSchema);