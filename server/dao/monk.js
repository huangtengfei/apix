/*
* dao层
* 
* 操作数据库，用 monk 操作简单，但没有 schema 限制，所以仅用于 mock api
* 
* */

'use strict';

const q = require('q');
const monk = require('monk');
const host = 'localhost/';

let mongo = {};

/**
 * find
 *
 * @param {String} the name of a database
 * @param {String} the name of a collection
 * @param {Object} query condition
 * @param {Object} query params (skip, limit)
 * @return {response}
 * @mongo api
 */
mongo.find = (dbName, collection, condition, res) => {

	let db = monk(host + dbName);
	let model = db.get(collection);

	model.find(condition, (err, doc) => {
		if(err) {
			console.log(err);
			return res.sendStatus(500);
		}
		if(doc){
			return res.json(doc);
		}else{
			return res.sendStatus(404);
		}
	})
};

/**
 * findById
 *
 * @param {String} the name of a database
 * @param {String} the name of a collection
 * @param {String} id(ObjectId)
 * @return {response}
 * @mongo api
 */
mongo.findById = (dbName, collection, id, res) => {

	let db = monk(host + dbName);
	let model = db.get(collection);

	model.findById(id, (err, doc) => {
		if(err) {
			console.log(err);
			return res.sendStatus(500);
		}
		if(doc){
			return res.json(doc);
		}else{
			return res.sendStatus(404);
		}
	})
};

/**
* insert
*
* @param {String} the name of a database
* @param {String} the name of a collection
* @param {Object} the data to be inserted
* @return {response}
* @mongo api
*/
mongo.insert = (dbName, collection, data, res) => {

	let db = monk(host + dbName);
	let model = db.get(collection);

	model.insert(data, (err, doc) => {
		if(err) {
			console.log(err);
			return res.sendStatus(500);
		}
		return res.json(doc);
	})
};

/**
 * updateById
 *
 * @param {String} the name of a database
 * @param {String} the name of a collection
 * @param {String} id(ObjectId)
 * @return {response}
 * @mongo api
 */
mongo.updateById = (dbName, collection, id, data, res) => {

	let db = monk(host + dbName);
	let model = db.get(collection);
	
	model.updateById(id, {$set: data}, (err, doc) => {
		if(err) {
			console.log(err);
			return res.sendStatus(500);
		}
		return res.json(doc);
	});
};

/**
 * removeById
 *
 * @param {String} the name of a database
 * @param {String} the name of a collection
 * @param {Object} query condition
 * @return {Promise}
 * @mongo api
 */
mongo.removeById = (dbName, collection, id, res) => {

	let db = monk(host + dbName);
	let model = db.get(collection);
	
	model.remove({_id: id}, (err, doc) => {
		if(err) {
			console.log(err);
			return res.sendStatus(500);
		}
		return res.json(doc);
	});
};

// 因为 mongoose 对 multi delete 的操作不方便，所以此处用了 monk
mongo.deleteGroup = (condition, res) => {

	let db = monk(host + 'apix');
	let model = db.get('groups');
	model.remove(condition, (err, doc) => {
		if(err) {
			console.log(err);
			return res.sendStatus(500);
		}
		if(doc){
			let model = db.get('apis');
			let subCond = {
				system: condition.system,
				group: condition.name
			}
			model.remove(subCond, (err, doc) => {
				if(err) {
					console.log(err);
					return res.sendStatus(500);
				}
				return res.json(doc);
			})
		}else{
			return res.sendStatus(404);
		}
	})
}

module.exports = mongo;