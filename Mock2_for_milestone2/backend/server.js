const express = require('express');
const cors = require('cors');  // Add this

const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(cors());  // Add this line
app.use(express.json());

// Global middleware to log method and URL
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// In-memory products array
let products = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 200 },
];

// Static user
const staticUser = { email: 'admin@test.com', password: '12345' };

// JWT secret
const secret = 'secret';

// Routes for Q9
app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be a number')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.json(newProduct);
});

// Routes for Q10
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === staticUser.email && password === staticUser.password) {
    const token = jwt.sign({ email: staticUser.email }, secret);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Auth middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

app.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to dashboard' });
});

// Routes for Q4
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({
    id: parseInt(id),
    name: `User ${id}`,
    email: `user${id}@gmail.com`
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});