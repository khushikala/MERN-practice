const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock data
let products = [
  { id: 1, name: 'Laptop', price: 60000, category: 'Electronics', description: 'Powerful laptop for work' },
  { id: 2, name: 'Book', price: 250, category: 'Books', description: 'Interesting novel' },
  { id: 3, name: 'Shoes', price: 1200, category: 'Clothing', description: 'Comfortable running shoes' },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/products', (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
