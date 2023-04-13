const express = require('express');
const mainController = require('../controller/mainController');
const route = express.Router();
const passport = require('passport');

route.get('/', mainController.homeIndex)

route.get('/furniture', mainController.furniture);


route.use('/admin',require('./admin'));
route.use('/customer', require('./cutomer'));

module.exports = route