const express = require('express');
const adminController = require('../controller/adminController');
const Admin = require('../model/adminDB');
const passport = require('passport');
const Furniture  = require('../model/furnitureDB');
const vendor = require('../model/vendorDB');
const venContact = require('../model/vendorConDB');

const classBase = require('../controller/newClass');
const newClass = new classBase()

const route = express.Router();

route.get('/',passport.checkAuthentication,adminController.adminHome);

route.get('/addAdmin',passport.checkAuthentication, adminController.addAdmin);

route.post('/addAdmin/adminInsertData',passport.checkAuthentication,Admin.uploadAvatar,adminController.adminInsertData);

route.get('/viewAdmin',passport.checkAuthentication, adminController.viewAdmin);

route.get('/deleteAdminRecord/:id', adminController.deleteAdminRecord);

route.get('/register', adminController.adminRegister);

route.post('/register/addAdminDataInsertForRegister', adminController.addAdminDataInsertForRegister);

route.get('/login', adminController.adminLogin);

// route.post('/login/adminLoginforLoginpage', passport.authenticate('admin',(err,user)=>{
//     // console.log(user)
// },),adminController.adminLoginforLoginpage);

route.post('/login/adminLoginforLoginpage',passport.authenticate('admin',{failureRedirect : '/admin/login'}),adminController.adminLoginforLoginpage);

route.get('/forgotPassword',adminController.forgotPassword)

route.get('/addFurniture',passport.checkAuthentication, adminController.addFurniture);

route.post('/addFurniture/addFurnitureDatafromForm',passport.checkAuthentication,Furniture.uploadPicture, adminController.addFurnitureDatafromForm);

route.get('/viewFurniture',passport.checkAuthentication, adminController.viewFurniture);

route.get('/addVendors',passport.checkAuthentication, adminController.addVendors);

route.post('/addVendors/insertVendorsData',passport.checkAuthentication, vendor.uploadLogo, adminController.insertVendorsData);

route.post('/addVendors/addVendorContactData',passport.checkAuthentication,venContact.uploadavatar, adminController.addVendorContactData);

route.get('/viewShop',passport.checkAuthentication, adminController.viewShop);

route.get('/viewVendorContact',passport.checkAuthentication,adminController.viewVendorContact);

route.get('/viewOrder',passport.checkAuthentication, adminController.viewOrder);

route.get('/furnitureDeactive/:id', passport.checkAuthentication, adminController.furnitureDeactive);

route.get('/furnitureActive/:id',passport.checkAuthentication,adminController.furnitureActive);

route.post('/mailResetPassword',adminController.mailResetPassword);

route.get('/passwordResetLink/:id',adminController.passwordResetLink);

route.get('/passForgot', adminController.passForgot);

route.post('/newPasswordForAdmin',newClass.newPasswordForAdmin);

route.get('/activeAdmin',passport.checkAuthentication, adminController.activeAdmin);

route.get('/logout',passport.checkAuthentication, adminController.logout);

route.get('/changePassword',passport.checkAuthentication, adminController.changePassword);

route.post('/getchangePassword',passport.checkAuthentication, adminController.getchangePassword);


module.exports = route;