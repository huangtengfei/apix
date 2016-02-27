/*
* api层
* 
* 验证api
* 
* */

'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');

const mongo = require('../dao/mongo');

const cert = fs.readFileSync('./server/helper/private.key');	// 加密私钥

let auth = {};

// 登录验证
auth.login = (req, res) => {

	let username = req.body.username,
		password = req.body.password;

	if(!username || !password){
		return res.sendStatus(401);
	}

	mongo.login(username, password, res);
};

// 注册
auth.signUp = (req, res) => {

	let username = req.body.username,
		password = req.body.password,
		rPassword = req.body.rPassword;

	if(!username || !password || !rPassword || password != rPassword){
		return res.sendStatus(500);
	}

	mongo.signUp(username, password, res);
};

// 对需要token的api调用进行token验证
auth.verifyToken = (req, res, next) => {
	let token = req.headers['authorization'] || '';
	if(token){
		try{
			let userinfo = jwt.verify(token, cert);
			req._tokendata = userinfo;
			next();
		}catch(err){
			console.log(err);
			return res.sendStatus(401);
		}
	}else{
		return res.sendStatus(403);
	}
};

module.exports = auth;