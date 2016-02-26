/*
* api层
* 
* RESTful api
* 
* */

'use strict';

const monk = require('../dao/monk');
const util = require('../helper/util');

let mock = {};

mock.getAll = (req, res) => {

	console.log(req.params);

	let dbName = req.params.system;
	let collection = req.params.group;

	let query = req.query,
		condition = util.getQueryCondition(query);

	console.log(condition);
	monk.find(dbName, collection, condition, res);
}

mock.create = (req, res) => {

	let dbName = req.params.system;
	let collection = req.params.group;
	let data = req.body;

	console.log(data);

	monk.insert(dbName, collection, data, res);
}

module.exports = mock;