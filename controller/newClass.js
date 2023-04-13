const Admin = require('../model/adminDB');
const bcrypt = require('bcrypt');

module.exports = class Login {
    newPasswordForAdmin = async (req, res) => {
        if (req.body.npassword == req.body.cpassword) {
            let passHash = await bcrypt.hash(req.body.cpassword, 10)
            let passwordChange = await Admin.findByIdAndUpdate(req.body.aiD, {
                password: passHash
            });
            if (passwordChange) {
                return res.redirect('/admin/login')
            }
            else {
                console.log('Something Wrong')
                return res.redirect('back')
            }
        }
        else {
            console.log('Your New password and confirm password not match!!!');
            return res.redirect('back');
        }
    }
}