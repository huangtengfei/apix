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

	let dbName = req.params.system,
		collection = req.params.group;

	let query = req.query,
		condition = util.getQueryCondition(query);

	monk.find(dbName, collection, condition, res);
}

mock.create = (req, res) => {

	let dbName = req.params.system,
		collection = req.params.group,
		data = req.body;

	monk.insert(dbName, collection, data, res);
}

mock.getById = (req, res) => {

	let dbName = req.params.system,
		collection = req.params.group,
		id = req.params.id;

	monk.findById(dbName, collection, id, res);
}

mock.updateById = (req, res) => {

	let dbName = req.params.system,
		collection = req.params.group,
		id = req.params.id,
		data = req.body;

	monk.updateById(dbName, collection, id, data, res);
}

mock.removeById = (req, res) => {

	let dbName = req.params.system,
		collection = req.params.group,
		id = req.params.id;

	monk.removeById(dbName, collection, id, res);
}

module.exports = mock;