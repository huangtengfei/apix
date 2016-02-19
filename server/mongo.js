/*
* dao层
* 
* 操作数据库
* 
* */

'use strict';

const mongoose = require('mongoose');

const util = require('./util');
const schemas = require('./schemas');

let db = mongoose.createConnection('localhost', 'auth');

let UserModel = db.model('User', schemas.userSchema),
	TodoModel = db.model('Todo', schemas.todoSchema);

let mongo = {};

mongo.login = (username, password, res) => {
	UserModel.findOne({username: username, password: password}, (err, user) => {
		if(err){
			console.log(err);
			return res.sendStatus(401);
		}
		if(user){
			// 利用id和username生成token	
			let tokendata = {
				id: user._id,
				username: user.username
			}
			let token = util.genToken(tokendata);
			return res.json({
				pass: true,
				token: token,
				data: user
			})
		}else{
			return res.json({
				pass: false,
				data: 'Incorrect Username/Password'
			})
		}
	})
};

mongo.getTodos = (username, res) => {
	TodoModel.find({username: username}, (err, doc) => {
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		if(doc){
			return res.json(doc);
		}else{
			return res.sendStatus(404);
		}
	})
}

module.exports = mongo;

