//this will contain the design of collection(table)schema

const mongoose = require('mongoose');

const curdSchema= new mongoose.Schema({
    name: String
})

module.exports=mongoose.model('empdata',curdSchema);