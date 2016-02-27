/*
* 路由层
* 
* */

'use strict';

const auth = require('../api/auth');
const base = require('../api/base');
const mock = require('../api/mock');

function routes(app) {
	
	app.get('/', (req, res) => {
		res.render('index');
	})

	app.post('/apix/v1/login', auth.login);
	app.post('/apix/v1/signUp', auth.signUp);

	app.get('/apix/v1/systems', auth.verifyToken, base.getSystems);
	app.post('/apix/v1/systems', auth.verifyToken, base.createSystem);

	app.get('/apix/v1/groups', auth.verifyToken, base.getGroups);
	app.post('/apix/v1/groups', auth.verifyToken, base.createGroup);
	app.get('/apix/v1/group', auth.verifyToken, base.getGroup);
	app.patch('/apix/v1/group', auth.verifyToken, base.updateGroup);
	app.delete('/apix/v1/group', auth.verifyToken, base.deleteGroup);

	app.get('/apix/v1/apis', auth.verifyToken, base.getApis);
	app.post('/apix/v1/apis', auth.verifyToken, base.createApi);
	app.get('/apix/v1/apis/:id', auth.verifyToken, base.getApi);
	app.patch('/apix/v1/apis/:id', auth.verifyToken, base.updateApi);
	app.delete('/apix/v1/apis/:id', auth.verifyToken, base.deleteApi);

	app.get('/mock-api/:system/:group', mock.getAll);
	app.post('/mock-api/:system/:group', mock.create);
	app.get('/mock-api/:system/:group/:id', mock.getById);
	app.patch('/mock-api/:system/:group/:id', mock.updateById);
	app.delete('/mock-api/:system/:group/:id', mock.removeById);

}

module.exports = routes;