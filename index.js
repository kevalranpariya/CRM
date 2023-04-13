const express = require('express')

const port = 4600;

const server = express();

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kevalran720:YUYC7k9UhHR7Gecw@cluster0.mmypcla.mongodb.net/CRMproject').then(()=>{
    console.log('Database Connected')
}).catch((err)=>{
    console.log('Database not connected');
})

server.use(express.urlencoded())
server.set('view engine', 'ejs');
server.use(express.static('assets'));
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const customerPassport = require('./config/passport-customer-strategy');
const session = require('express-session');
const cookieParser = require('cookie-parser');



server.use(session({
    name : 'adminData',
    secret : 'rnWAdmin',
    saveUninitialized : false,
    resave : true,
    cookie :{
        maxAge : 10*100*1000
    }
}));

server.use(passport.initialize());
server.use(passport.session());

server.use(passport.setAuthentication);

server.use(cookieParser());

server.use('/',require('./routes'));

server.listen(port,(err)=>{
    if(err)
    {
        console.log('Server Is not Responding');
        return false
    }
    console.log('Server Is Responding !! Port = ',port)
});