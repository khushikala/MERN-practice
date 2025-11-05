// Compile with: tsc --target ES6 --experimentalDecorators productManager.ts
// or place tsconfig.json with "experimentalDecorators": true and run tsc
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Decorator to log changes for methods that modify price or stock
export function LogChange(target, propertyKey, descriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args) {
        // capture current state
        const prop = propertyKey.toLowerCase(); // e.g., "setprice" or "setstock"
        const beforePrice = this.price;
        const beforeStock = this.stock;
        const result = original.apply(this, args);
        // determine which changed
        if (propertyKey.toLowerCase().includes('price')) {
            console.log(`[LogChange] Product ${this.id} price changed: ${beforePrice} → ${args[0]}`);
        }
        else if (propertyKey.toLowerCase().includes('stock')) {
            console.log(`[LogChange] Product ${this.id} stock changed: ${beforeStock} → ${args[0]}`);
        }
        else {
            console.log(`[LogChange] ${propertyKey} called for product ${this.id}`);
        }
        return result;
    };
    return descriptor;
}
export var Category;
(function (Category) {
    Category["Electronics"] = "Electronics";
    Category["Clothing"] = "Clothing";
    Category["Home"] = "Home";
    Category["Accessories"] = "Accessories";
})(Category || (Category = {}));
export class Product {
    constructor(id, name, category, price, stock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
    // Methods to change price/stock — decorated to log changes
    setPrice(newPrice) {
        this.price = newPrice;
    }
    setStock(newStock) {
        this.stock = newStock;
    }
    toTuple() {
        return [this.id, { id: this.id, name: this.name, category: this.category, price: this.price, stock: this.stock }];
    }
}
__decorate([
    LogChange
], Product.prototype, "setPrice", null);
__decorate([
    LogChange
], Product.prototype, "setStock", null);
export class ProductManager {
    constructor() {
        this.products = new Map();
    }
    addProduct(product) {
        this.products.set(product.id, product);
    }
    updatePrice(productId, newPrice) {
        const p = this.products.get(productId);
        if (!p)
            throw new Error('Product not found');
        p.setPrice(newPrice);
    }
    updateStock(productId, newStock) {
        const p = this.products.get(productId);
        if (!p)
            throw new Error('Product not found');
        p.setStock(newStock);
    }
    removeProduct(productId) {
        this.products.delete(productId);
    }
    // iterate using for...of, return array of tuples for display
    listAsTuples() {
        const out = [];
        for (const [id, product] of this.products) {
            out.push(product.toTuple());
        }
        return out;
    }
    // helper for console display
    displayAll() {
        console.log('Product Inventory:');
        for (const [id, p] of this.products) {
            console.log(`- [${id}] ${p.name} | ${p.category} | ₹${p.price} | stock: ${p.stock}`);
        }
    }
}
// Example usage (for testing) - uncomment when running the compiled JS directly
const pm = new ProductManager();
const p1 = new Product(1, 'Headphones', Category.Electronics, 2499, 12);
const p2 = new Product(2, 'T-Shirt', Category.Clothing, 799, 30);
pm.addProduct(p1);
pm.addProduct(p2);
pm.displayAll();
pm.updatePrice(1, 2299);
pm.updateStock(2, 25);
pm.displayAll();
console.log(pm.listAsTuples());
