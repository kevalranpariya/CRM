const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const picturePath = '/img/furniture';

const furnitureSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    type :{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    cost :{
        type : Number,
        required : true
    },
    stock :{
        type : Number,
        required : true
    },
    sold :{
        type : Number,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true
    },
    picture:{
        type : String,
        required : true
    }
});

const furnitureSto = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null, path.join(__dirname,'../assets',picturePath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});

furnitureSchema.statics.uploadPicture = multer({storage : furnitureSto}).single('picture');
furnitureSchema.statics.picturePath = picturePath;

const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture;