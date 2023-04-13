const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const Customer = require('../model/customerDB');
const bcrypt = require('bcrypt');

passport.use('customer', new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    let user = await Customer.findOne({
        email: email
    });

    if (user) {
        let checkPass = await bcrypt.compare(password, user.password);

        if (checkPass) {
            return done(null, user);
        }
        console.log('Password Not Match!!');
        return done(null, false);
    }
    console.log('Not Found Mail ID');
    return done(null, false)
}));


passport.checkAuthenticationCustomer = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role == 'User') {
            return next();
        }
    }
    return res.redirect('/customer/login');
}

module.exports = passport;