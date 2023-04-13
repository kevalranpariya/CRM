const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const picturePath = '/img/vendors/contact'

const vendroConSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    vendorID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Shop',
        required : true
    },
    email :{
        type : String,
        required : true
    },
    phone :{
        type : Number,
        required : true
    },
    avatar:{
        type : String,
        required : true
    }
});

const vendorConStro = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null, path.join(__dirname,'../assets',picturePath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});

vendroConSchema.statics.uploadavatar = multer({storage : vendorConStro}).single('avatar');
vendroConSchema.statics.picturePath = picturePath;

const VendorCon = mongoose.model('Vendor Contact', vendroConSchema);

module.exports = VendorCon;