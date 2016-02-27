/*
* 数据库schemas
* 
* */

'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schemas = {};

schemas.userSchema = new Schema({
    username: String,
    password: String
});

schemas.systemSchema = new Schema({
	userId: String, 
    name: String,  
    desc: String
})

schemas.groupSchema = new Schema({
	system: String,  
    name: String, 
    desc: String,
    mockApis: Array
})

schemas.apiSchema = new Schema({
    system: String,
	group: String,  
    name: String,   
    desc: String, 
    method: Number,
    url: String, 
    request: String,
    response: String
})

module.exports = schemas;