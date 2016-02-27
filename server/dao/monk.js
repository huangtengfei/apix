/*
 * 数据库api，不要改动
 * 
*/

'use strict';

const q = require('q');
const monk = require('monk');
const host = 'localhost/';
const db = require('monk')('localhost/sncp');

let mongo = {};

/**
 * find
 *
 * @param {String} the name of a collection
 * @param {Object} query condition
 * @param {Object} query params (skip, limit)
 * @return {Promise}
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
 * @param {String} the name of a collection
 * @param {String} id(ObjectId)
 * @return {Promise}
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
* @param {String} the name of a collection
* @param {Object} the data to be inserted
* @return {Promise}
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
 * @param {String} the name of a collection
 * @param {String} id(ObjectId)
 * @return {Promise}
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

// /**
//  * findByPage
//  *
//  * @param {String} the name of a collection
//  * @param {Object} query condition
//  * @param {Object} query params (skip, limit)
//  * @return {Promise}
//  * @mongo api
//  */
// mongo.findByPage = (collection, condition, params) => {
// 	let defer = q.defer();
// 	let model = db.get(collection);
// 	model.count(condition, (error, count) => {
// 		if(error) {
// 			defer.reject(error);
// 		}
// 		model.find(condition, params, (err, doc) => {
// 			if(err) {
// 				defer.reject(err);
// 			}
// 			let result = {			
// 				count: count,
// 				data: doc
// 			}
// 			defer.resolve(result);
// 		})
// 	})
// 	return defer.promise;
// }

// /**
//  * findOne
//  *
//  * @param {String} the name of a collection
//  * @param {Object} query condition
//  * @return {Promise}
//  * @mongo api
//  */
// mongo.findOne = (collection, condition) => {
// 	let defer = q.defer();
// 	let model = db.get(collection);
// 	model.findOne(condition, (err, doc) => {
// 		if(err) {
// 			defer.reject(err);
// 		}
// 		defer.resolve(doc);
// 	})
// 	return defer.promise;
// };

// /**
//  * update
//  *
//  * @param {String} the name of a collection
//  * @param {String} query condition
//  * @return {Promise}
//  * @mongo api
//  */
// mongo.update = (collection, condition, data) => {

// 	let defer = q.defer();
// 	let model = db.get(collection);
	
// 	model.update(condition, {$set: data}, (err, doc) => {
// 		if(err) {
// 			defer.reject(err);
// 		}
// 		defer.resolve(doc);
// 	});

// 	return defer.promise;
// };

module.exports = mongo;