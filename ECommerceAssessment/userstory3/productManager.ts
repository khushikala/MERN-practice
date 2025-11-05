// Compile with: tsc --target ES6 --experimentalDecorators productManager.ts
// or place tsconfig.json with "experimentalDecorators": true and run tsc

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

type ProductTuple = [number, IProduct]; // id and product tuple

// Decorator to log changes for methods that modify price or stock
export function LogChange(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    // capture current state
    const prop = propertyKey.toLowerCase(); // e.g., "setprice" or "setstock"
    const beforePrice = this.price;
    const beforeStock = this.stock;
    const result = original.apply(this, args);
    // determine which changed
    if (propertyKey.toLowerCase().includes('price')) {
      console.log(`[LogChange] Product ${this.id} price changed: ${beforePrice} → ${args[0]}`);
    } else if (propertyKey.toLowerCase().includes('stock')) {
      console.log(`[LogChange] Product ${this.id} stock changed: ${beforeStock} → ${args[0]}`);
    } else {
      console.log(`[LogChange] ${propertyKey} called for product ${this.id}`);
    }
    return result;
  };
  return descriptor;
}

export enum Category {
  Electronics = "Electronics",
  Clothing = "Clothing",
  Home = "Home",
  Accessories = "Accessories"
}

export class Product implements IProduct {
  constructor(
    public id: number,
    public name: string,
    public category: string,
    public price: number,
    public stock: number
  ) {}

  // Methods to change price/stock — decorated to log changes
  @LogChange
  public setPrice(newPrice: number) {
    this.price = newPrice;
  }

  @LogChange
  public setStock(newStock: number) {
    this.stock = newStock;
  }

  public toTuple(): ProductTuple {
    return [this.id, { id: this.id, name: this.name, category: this.category, price: this.price, stock: this.stock }];
  }
}

export class ProductManager {
  private products: Map<number, Product> = new Map();

  addProduct(product: Product) {
    this.products.set(product.id, product);
  }

  updatePrice(productId: number, newPrice: number) {
    const p = this.products.get(productId);
    if (!p) throw new Error('Product not found');
    p.setPrice(newPrice);
  }

  updateStock(productId: number, newStock: number) {
    const p = this.products.get(productId);
    if (!p) throw new Error('Product not found');
    p.setStock(newStock);
  }

  removeProduct(productId: number) {
    this.products.delete(productId);
  }

  // iterate using for...of, return array of tuples for display
  public listAsTuples(): ProductTuple[] {
    const out: ProductTuple[] = [];
    for (const [id, product] of this.products) {
      out.push(product.toTuple());
    }
    return out;
  }

  // helper for console display
  public displayAll() {
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