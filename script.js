const fs = require("fs");

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    getProducts() {
        if (fs.existsSync(this.path)) {
            let fileData = fs.readFileSync(this.path, { encoding: "utf-8" });
            return JSON.parse(fileData);
        } else {
            return [];
        }
    }

    addProduct(product) {
        let products = this.getProducts();
        let id = 1;
        if (products.length > 0) {
            id = products[products.length - 1].id + 1;
        }
        product.id = id;
        products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(products, null, 4));
        return product;
    }

    getProductById(id) {
        let products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(updatedProduct) {
        let products = this.getProducts();
        let index = products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
            products[index] = updatedProduct;
            fs.writeFileSync(this.path, JSON.stringify(products, null, 4));
            return updatedProduct;
        } else {
            console.log("Product not found.");
            return null;
        }
    }

    deleteProduct(id) {
        let products = this.getProducts();
        let updatedProducts = products.filter(product => product.id !== id);
        fs.writeFileSync(this.path, JSON.stringify(updatedProducts, null, 4));
    }
}

const filePath = "./productos.json";
const productManager = new ProductManager(filePath);

// Ejemplos de uso
productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abe123",
    stock: 25
});

productManager.addProduct({
    title: "producto estupendo",
    description: "Este es un producto original",
    price: 201,
    thumbnail: "sin imagen",
    code: "abe115",
    stock: 24
});

console.log("Todos los productos:", productManager.getProducts());
