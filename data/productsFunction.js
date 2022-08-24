const fs = require('fs');
const path = require('path');

const loadProducts =()=>{
    const productsFIlePath = path.join(__dirname,'dataBase.json');
    const products = JSON.parse(fs.readFileSync(productsFIlePath,'utf-8'));
    return products;
}
const storeProducts =(products)=>{
    fs.writeFileSync(
        path.join(__dirname, "dataBase.json"),
        JSON.stringify(products, null, 3),
        "utf-8");
}









module.exports = {
    loadProducts,
    storeProducts
}