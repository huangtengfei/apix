/*
* 路由层
* 
* */

'use strict';

const auth = require('./auth');
const api = require('./api');

function routes(app) {
	
	app.get('/', (req, res) => {
		res.render('index');
	})

	app.post('/login', auth.login);

	app.get('/list', auth.verifyToken, api.list);

}

module.exports = routes;