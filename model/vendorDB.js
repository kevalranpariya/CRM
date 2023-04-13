const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const picturePath = '/img/vendors/shop';

const vendroSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    furnitureID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Furniture',
        required : true
    },
    email :{
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    },
    logo:{
        type : String,
        required : true
    }
});

const shopStro = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null, path.join(__dirname,'../assets',picturePath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});

vendroSchema.statics.uploadLogo = multer({storage : shopStro}).single('logo');
vendroSchema.statics.picturePath = picturePath;

const Shop = mongoose.model('Shop', vendroSchema);

module.exports = Shop;