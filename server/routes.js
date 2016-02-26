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

	app.post('/apix/v1/login', auth.login);

	app.get('/apix/v1/systems', auth.verifyToken, api.listSystems);
	app.get('/apix/v1/groups', auth.verifyToken, api.listGroups);
	app.get('/apix/v1/apis', auth.verifyToken, api.listApis);

	app.post('/apix/v1/groups', auth.verifyToken, api.createGroup);
	app.post('/apix/v1/apis', auth.verifyToken, api.createApi);
	app.get('/apix/v1/group', auth.verifyToken, api.getGroup);
	app.get('/apix/v1/api', auth.verifyToken, api.getApi);


}

module.exports = routes;