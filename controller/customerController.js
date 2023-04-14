const Furniture = require('../model/furnitureDB');
const Order = require('../model/orderDB');
const Customer = require('../model/customerDB');
const bcrypt = require('bcrypt');

module.exports.buyProduct = async (req, res) => {
    let furniture = await Furniture.findById(req.params.id);
    return res.render('buyFurniture', {
        product: furniture,
        userData : req.user
    })
}

module.exports.placeOrderByCustomer = async (req, res) => {
    let checkFurniture = await Furniture.findById(req.body.productID);
    if(checkFurniture.stock >= req.body.quntatity)
    {
        let letOrder = await Order.create(req.body);
        if (letOrder) {
            let furnitureUpdate = await Furniture.findByIdAndUpdate(req.body.productID,{
                stock : Number(checkFurniture.stock) - Number(req.body.quntatity),
                sold : Number(checkFurniture.sold) + Number(req.body.quntatity)
            });
            


            let updateOrderinCustomer = await Customer.findByIdAndUpdate(req.user.id,{
                $push : {order : letOrder.id}
            });

            return res.redirect('/customer/order');
        }
        console.log('Can not find Data');
        return res.redirect('back')
    }
    console.log('This Product Not in Stock ')
    return res.redirect('back');
}

module.exports.login = async (req, res) => {
    if(req.isAuthenticated())
    {
        return res.redirect('back');
    }
    return res.render('customerLogin');
}

module.exports.insertRegister = async (req, res) => {
    let checkCustomer = await Customer.findOne({
        email: req.body.email
    });

    if (checkCustomer) {
        console.log('Check Your Mail ID!!!')
        return res.redirect('back');
    }
    else {
        if (req.body.password == req.body.cpassword) {
            req.body.password = await bcrypt.hash(req.body.password,10);
            req.body.role = 'User';
            let addCustomer = await Customer.create(req.body);
            if (addCustomer) {
                return res.redirect('back');
            }
            else {
                console.log('Something Wrong');
                return res.redirect('back');
            }
        }
        else {
            console.log('Password And Confirm Password Are Not Match!!!')
            return res.redirect('back');
        }
    }
}

module.exports.insertLogin = async(req,res)=>{
    return res.redirect('/customer/order');
}

module.exports.orderView = async(req,res)=>{

    
    checkOrder = await Order.find({
        customerID : req.user.id
    }).populate('productID').exec()

    

    if(checkOrder?.length)
    {
        return res.render('order',{
            orderDe : checkOrder
        });
    }
    return res.redirect('/');
}