const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name : {
        type : String,
        requried : true
    },
    email : {
        type : String,
        required : true,
    },
    role :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    order :{
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Oreder'
        }]
    }
});

const Customer= mongoose.model('Customer',customerSchema);

module.exports = Customer;