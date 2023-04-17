const Admin = require('../model/adminDB');
const bcrypt = require('bcrypt');
const Furniture = require('../model/furnitureDB');
const Vendor = require('../model/vendorDB');
const vendorCon = require('../model/vendorConDB');
const Order = require('../model/orderDB');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');


module.exports.adminHome = (req, res) => {
    return res.render('adminIndex')
}

module.exports.addAdmin = (req, res) => {
    return res.render('addAdmin')
}

module.exports.adminInsertData = async (req, res) => {
    let checkAdminData = await Admin.findOne({
        email: req.body.email
    });
    console.log(checkAdminData);

    if (checkAdminData) {

        console.log('Email Are Match!! Plaese Another email id and try')
        return res.redirect('back')
    }
    else {
        if (req.file) {
            let imgPath = Admin.imgPath + '/' + req.file.filename;
            req.body.avatar = imgPath
        }
        else {
            console.log('Image not insert')
            return res.redirect('back')
        }
        req.body.isActive = true
        req.body.role = 'Admin'
        req.body.password = await bcrypt.hash(req.body.password, 10)
        let adminData = await Admin.create(req.body);

        if (adminData) {
            return res.redirect('back')
        }
        else {
            console.log('Data not Insert')
            return res.redirect('back')
        }
    }
}

module.exports.deleteAdminRecord = async (req, res) => {
    const checkAdmin = await Admin.findById(req.params.id);

    if (checkAdmin.avatar != 'null') {
        fs.unlinkSync(path.join(__dirname, '../assets', checkAdmin.avatar));
    }
    const deleteAdmin = await Admin.findByIdAndDelete(req.params.id);

    if (deleteAdmin) {
        return res.redirect('back');
    }
    console.log('Data can not find');
    return res.redirect('back');
}

module.exports.viewAdmin = async (req, res) => {
    let adminData = await Admin.find({});
    if (adminData) {

        return res.render('viewAdmin', {
            data: adminData
        });
    }
    else {
        console.log('Can not Find Data')
        return res.redirect('back')
    }
}

module.exports.adminRegister = (req, res) => {
    return res.render('adminRegister');
}

module.exports.addAdminDataInsertForRegister = async (req, res) => {
    let checkAdminData = await Admin.findOne({ email: req.body.email });

    if (checkAdminData) {
        console.log('This Email id already Register Plaese Another Email id Try!!!')
        return res.redirect('back')
    }
    else {
        req.body.phone = 'null';
        req.body.avatar = 'null';
        req.body.message = 'null';
        req.body.role = 'Admin'
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let addAdminData = await Admin.create(req.body);

        if (addAdminData) {
            return res.redirect('/admin/login');
        }
        else {
            console.log('Data not register');
            return res.redirect('back')
        }
    }
}

module.exports.adminLogin = (req, res) => {
    return res.render('adminLogin');
}

module.exports.adminLoginforLoginpage = async (req, res) => {
    return res.redirect('/admin')
}

module.exports.forgotPassword = async (req, res) => {
    return res.render('adminForgotPassword')
}

module.exports.addFurniture = (req, res) => {
    return res.render('addFurniture');
}

module.exports.addFurnitureDatafromForm = async (req, res) => {
    if (req.file) {
        req.body.picture = Furniture.picturePath + '/' + req.file.filename;
    }
    else {
        console.log('File Missing!!')
        return res.redirect('back');
    }
    req.body.isActive = true;
    let addFurniture = await Furniture.create(req.body);
    if (addFurniture) {
        return res.redirect('back');
    }
    else {
        console.log('Furniture not add')
        return res.redirect('back');
    }
}

module.exports.viewFurniture = async (req, res) => {
    let page = 1;
    let perpage = 2;
    if(req.query.page)
    {
        page = req.query.page
    }

    let allFurniture = await Furniture.find({
        
    }).skip((page-1)*perpage)
    .limit(perpage);

    let furnitureCol = await Furniture.find({}).countDocuments();

    return res.render('viewFurniture', {
        data: allFurniture,
        pageination : Math.ceil(furnitureCol/perpage)
    });
}

module.exports.addVendors = async (req, res) => {
    let letFurniture = await Furniture.find({
        isActive: true
    });
    let letVendors = await Vendor.find({});
    return res.render('addVendor', {
        furniture: letFurniture,
        vendorData: letVendors
    });
}

module.exports.insertVendorsData = async (req, res) => {

    if (req.file) {
        let logoPath = Vendor.picturePath + '/' + req.file.filename;
        req.body.logo = logoPath;
        let addVendor = await Vendor.create(req.body);

        if (addVendor) {
            return res.redirect('back');

        }
        else {
            console.log('Data not insertes');
            return res.redirect('back');
        }
    }
    else {
        console.log('First of all logo add');
        return res.redirect('back');
    }

}

module.exports.addVendorContactData = async (req, res) => {
    if (req.file) {
        let avatarPath = vendorCon.picturePath + '/' + req.file.filename;
        req.body.avatar = avatarPath;
        let addVendorContact = await vendorCon.create(req.body);

        if (addVendorContact) {
            return res.redirect('back');

        }
        else {
            console.log('Data not insertes');
            return res.redirect('back');
        }
    }
    else {
        console.log('First of all Profile Pic add');
        return res.redirect('back');
    }
}

module.exports.viewShop = async (req, res) => {
    let shopData = await Vendor.find({}).populate('furnitureID').exec();
    return res.render('viewShop', {
        record: shopData
    });
}

module.exports.viewVendorContact = async (req, res) => {
    let venContact = await vendorCon.find({}).populate('vendorID').exec();
    return res.render('viewVendorCon', {
        record: venContact
    });
}

module.exports.viewOrder = async (req, res) => {
    let allOrder = await Order.find({}).populate('productID').populate('customerID').exec();
    // console.log(allOrder);
    return res.render('viewOrder', {
        record: allOrder
    });
}

module.exports.furnitureDeactive = async (req, res) => {
    let deActiveData = await Furniture.findByIdAndUpdate(req.params.id, {
        isActive: false
    });

    if (deActiveData) {
        return res.redirect('back');
    }
    console.log('Something Wrong');
    return res.redirect('back');
}

module.exports.furnitureActive = async (req, res) => {
    let isActiveData = await Furniture.findByIdAndUpdate(req.params.id, {
        isActive: true
    });

    if (isActiveData) {
        return res.redirect('back');
    }
    console.log('Something Wrong');
    return res.redirect('back');
}

module.exports.activeAdmin = async (req, res) => {
    return res.render('activeAdmin')
}

module.exports.logout = async (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log('SOmething Wrong');
            return res.redirect('back');
        }
        return res.redirect('/admin/login')
    })
}

module.exports.changePassword = async (req, res) => {
    return res.render('changePassword')
}

module.exports.getchangePassword = async (req, res) => {
    let checkAdmin = await Admin.findById(req.body.adminID);

    if (checkAdmin) {
        let passCheck = await bcrypt.compare(req.body.password, checkAdmin.password)
        if (passCheck) {
            if (req.body.cpassword == req.body.npassword) {
                let pass = await bcrypt.hash(req.body.npassword, 10);

                let updateAdmin = await Admin.findByIdAndUpdate(req.body.adminID, {
                    password: pass
                });
                if (updateAdmin) {
                    return res.redirect('back');
                }
                console.log('Something Wrong');
                return res.redirect('back');
            }
            else {
                console.log('New And Confirm password not match!!');
                return res.redirect('back');
            }
        }
        else {
            console.log('Your Current Password Not curret');;
            return res.redirect('back');
        }
    }
    else {
        console.log('Admin not found');
        return res.redirect('back');
    }
}

module.exports.mailResetPassword = async (req, res) => {
    checkAdmin = await Admin.findOne({
        email: req.body.email
    });

    if (checkAdmin) {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "e6b7d6a29ff81a",
                pass: "692e127db25e24"
            }
        });

        let info = await transport.sendMail({
            from: 'keval@gmail.com', // sender address
            to: checkAdmin.email, // list of receivers
            subject: "Password Reset", // Subject line
            text: "Password Forgot", // plain text body
            html: '<h1>Password Reset Link</h1><a href="localhost:4600/admin/passwordResetLink/' + checkAdmin.id + '/?email_vey=true" target="_blank">Click Me</a>', // html body
        });

        return res.end('Check Your Mail AND Click the reset link!!!!');
    }
    else {
        console.log('Can not find email id');
        return res.redirect('back')
    }
}

module.exports.passwordResetLink = async (req, res) => {
    let checkAdmin = await Admin.findById(req.params.id);

    if (checkAdmin) {
        if (req.query.email_vey == 'true') {
            res.cookie('a_id', req.params.id)
            return res.redirect('/admin/passForgot')
        }
        return res.redirect('/admin/forgotPassword');
    }
    return res.redirect('/admin');
}

module.exports.passForgot = async (req, res) => {
    let adminId = req.cookies.a_id
    return res.render('adminReenterPassword', {
        aID: adminId
    })
}

// module.exports.newPasswordForAdmin = async(req,res)=>{
//     if(req.body.npassword == req.body.cpassword)
//     {
//         let passHash = await bcrypt.hash(req.body.cpassword,10)
//         let passwordChange = await Admin.findByIdAndUpdate(req.body.aiD,{
//             password : passHash
//         });
//         if(passwordChange)
//         {
//             return res.redirect('/admin/login')
//         }
//         else{
//             console.log('Something Wrong')
//             return res.redirect('back')
//         }
//     }
//     else{
//         console.log('Your New password and confirm password not match!!!');
//         return res.redirect('back');
//     }
// }