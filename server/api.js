/*
* api层
* 
* 普通api
* 
* */

'use strict';

const mongo = require('./mongo');

let api = {};

api.listSystems = (req, res) => {
	let tokendata = req._tokendata;
	mongo.listSystems(tokendata.id, res);
}

api.listGroups = (req, res) => {
	let params = req.query;
	mongo.listGroups(params.system, res);
}

api.listApis = (req, res) => {
	let params = req.query;
	mongo.listApis(params.group, res);
}

api.createGroup = (req, res) => {
	let params = req.body;
	mongo.createGroup(params, res);
}

api.createApi = (req, res) => {
	let params = req.body;
	mongo.createApi(params, res);
}

api.getGroup = (req, res) => {
	let params = req.query;
	mongo.getGroup(params, res);
}

api.getApi = (req, res) => {
	let params = req.query;
	mongo.getApi(params.id, res);
}

module.exports = api;