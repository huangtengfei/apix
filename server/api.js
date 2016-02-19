/*
* api层
* 
* 普通api
* 
* */

'use strict';

const mongo = require('./mongo');

let api = {};

api.list = (req, res) => {
	let tokendata = req._tokendata;
	mongo.getTodos(tokendata.username, res);
}

module.exports = api;