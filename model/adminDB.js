const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const imgPath = '/img/admin'

const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        requried : true
    },
    role:{
        type : String
    },
    message : {
        type : String,
        required : true
    },
    avatar :{
        type : String,
        required : true
    }
});

const multerSto = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname,'../assets',imgPath));
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname +'-'+Date.now())
    }
});

adminSchema.statics.uploadAvatar = multer({storage:multerSto}).single('avatar');
adminSchema.statics.imgPath = imgPath;



const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;