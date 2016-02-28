/*
* api层
* 
* 普通api
* 
* */

'use strict';

const mongo = require('../dao/mongo');
const monk = require('../dao/monk');

let base = {};

base.getSystems = (req, res) => {
	let tokendata = req._tokendata;
	mongo.getSystems(tokendata.id, res);
};

base.createSystem = (req, res) => {
	let params = req.body;
	mongo.createSystem(params, res);
};


base.getGroups = (req, res) => {
	let params = req.query;
	mongo.getGroups(params.system, res);
};

base.createGroup = (req, res) => {
	let params = req.body;
	mongo.createGroup(params, res);
};

base.getGroup = (req, res) => {
	let params = req.query;
	mongo.getGroup(params, res);
};

base.updateGroup = (req, res) => {

	let params = req.query;
	let groupData = req.body;
	mongo.updateGroup(params, groupData, res);
};

base.deleteGroup = (req, res) => {
	let params = req.query;
	if(Object.keys(params).length != 2){
		res.sendStatus(404);
	}else{
		monk.deleteGroup(params, res);
	}
};

base.getApis = (req, res) => {
	let params = req.query;
	mongo.getApis(params, res);
};

base.createApi = (req, res) => {
	let params = req.body;
	mongo.createApi(params, res);
};

base.getApi = (req, res) => {
	let apiId = req.params.id;
	mongo.getApi(apiId, res);
};

base.updateApi = (req, res) => {
	let apiId = req.params.id;
	let apiData = req.body;
	mongo.updateApi(apiId, apiData, res);
};

base.deleteApi = (req, res) => {
	let apiId = req.params.id;
	mongo.deleteApi(apiId, res);
};

module.exports = base;