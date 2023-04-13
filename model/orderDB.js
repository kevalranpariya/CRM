const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerID : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        requried : true
    },
    address : {
        type : String,
        required : true,
    },
    productID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Furniture',
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    quntatity : {
        type : Number,
        requried : true
    },
    message : {
        type : String,
        required : true
    }
});

const Oreder= mongoose.model('Oreder',orderSchema);

module.exports = Oreder;