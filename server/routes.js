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

	app.get('/api/systems', auth.verifyToken, api.listSystems);
	app.get('/api/groups', auth.verifyToken, api.listGroups);
	app.get('/api/apis', auth.verifyToken, api.listApis);
	app.post('/api/groups', auth.verifyToken, api.createGroup);
	app.post('/api/apis', auth.verifyToken, api.createApi);
	app.get('/api/api', auth.verifyToken, api.getApi);


}

module.exports = routes;