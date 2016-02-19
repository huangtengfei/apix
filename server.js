'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');

const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.engine('html', require('ejs').renderFile);

app.listen(8000, () => {
	console.log('node server started at port 8000...');
})

routes(app);
