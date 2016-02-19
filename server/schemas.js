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

schemas.todoSchema = new Schema({
	username: String,
	todos: []
})

module.exports = schemas;