const passport = require('passport');
const passportLocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/adminDB');
const Customer = require('../model/customerDB');
const bcrypt = require('bcrypt');

passport.use('admin', new passportLocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    let user = await Admin.findOne({ email: email });

    if (user) {
        const pass = await bcrypt.compare(password, user.password);
        if (pass) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    else {
        return done(null, false);
    }
}));

passport.serializeUser((user, done) => {
    if (user.role == 'Admin' || user.role == 'User') {
        return done(null, user.id);
    }
})

passport.deserializeUser(async (id, done) => {
    let admin = await Admin.findById(id);
    let customer = await Customer.findById(id);

    if (admin?.role == 'Admin') {
        return done(null, admin)
    }
    else if (customer?.role == 'User') {
        return done(null, customer);
    }
});

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role == 'Admin') {
            return next();
        }
    }
    return res.redirect('/admin/login');
}


passport.setAuthentication = (req, res, next) => {
    if(req.isAuthenticated())
    {
        if (req.user.role == 'Admin') {
            res.locals.admin = req.user
        }
        else if (req.user.role == 'User') {
            res.locals.user = req.user
        }
    }
   return next();
    
}

module.exports = passport;