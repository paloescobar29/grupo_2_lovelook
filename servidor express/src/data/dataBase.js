let fs=require('fs')

module.exports = {
    getShops : JSON.parse(fs.readFileSync('./src/data/shops.json','utf-8')),

    getProducts:JSON.parse(fs.readFileSync('./src/data/products.json','utf-8')),
    
    getImgCarousel:JSON.parse(fs.readFileSync('./src/data/carousel.json','utf-8')),

    writeProductsJSON: (dataBase) => {
        fs.writeFileSync(path.join(__dirname, "../data/products.json"), JSON.stringify(dataBase), "utf-8")
    }

}