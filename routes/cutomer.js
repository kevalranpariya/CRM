const express = require('express');
const customerController = require('../controller/customerController');
const route = express.Router();
const passport = require('passport');

route.get('/buyProduct/:id',passport.checkAuthenticationCustomer, customerController.buyProduct)

route.post('/buyProduct/placeOrderByCustomer',passport.checkAuthenticationCustomer,customerController.placeOrderByCustomer);

route.get('/login', customerController.login);

route.post('/insertRegister',customerController.insertRegister);

route.post('/insertLogin',passport.authenticate('customer',{failureRedirect : '/customer/login'}), customerController.insertLogin);

route.get('/order',passport.checkAuthenticationCustomer, customerController.orderView)

module.exports = route;