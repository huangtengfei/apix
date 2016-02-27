/*
* api层
* 
* 普通api
* 
* */

'use strict';

const mongo = require('../dao/mongo');

let base = {};

base.listSystems = (req, res) => {
	let tokendata = req._tokendata;
	mongo.listSystems(tokendata.id, res);
}

base.listGroups = (req, res) => {
	let params = req.query;
	mongo.listGroups(params.system, res);
}

base.listApis = (req, res) => {
	let params = req.query;
	mongo.listApis(params.group, res);
}

base.createSystem = (req, res) => {
	let params = req.body;
	mongo.createSystem(params, res);
}

base.createGroup = (req, res) => {
	let params = req.body;
	mongo.createGroup(params, res);
}

base.createApi = (req, res) => {
	let params = req.body;
	mongo.createApi(params, res);
}

base.getGroup = (req, res) => {
	let params = req.query;
	mongo.getGroup(params, res);
}

base.getApi = (req, res) => {
	let params = req.query;
	mongo.getApi(params.id, res);
}

module.exports = base;