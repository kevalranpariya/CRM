const Furniture = require('../model/furnitureDB');

module.exports.homeIndex = async(req,res)=>{
    let allFurniture = await Furniture.find({
        isActive : true
    });
   let furniturerev =  allFurniture.reverse();
    return res.render('index',{
        furnitureData : furniturerev.slice(0,3)
    })
}

module.exports.furniture = async(req,res)=>{
    let allFurniture = await Furniture.find({
        isActive : true
    });
    return res.render('furniture',{
        getFurni : allFurniture.reverse()
    });
}