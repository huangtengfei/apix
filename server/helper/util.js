/*
* 工具函数
* 
* */

'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');

const cert = fs.readFileSync('./server/helper/private.key');	// 加密私钥
const TOKEN_EXPIRATION = '1h';	// token 过期时间，默认单位为s，Eg: 60, "2 days", "10h", "7d"

let util = {};

util.genToken = (tokendata) => {
	return jwt.sign(tokendata, cert, {expiresIn: TOKEN_EXPIRATION});	
}

util.getQueryCondition = (obj) => {
	let condition = {};
	Object.keys(obj).forEach((k) => {
		if(k != 'noCache' && k != 'pageSize' && k != 'pageNumber' && obj[k]) {
			condition[k] = obj[k];
		}
	})
	return condition;
}

module.exports = util;