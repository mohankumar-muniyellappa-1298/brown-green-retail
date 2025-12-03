const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(bodyParser.json());

// Initialize data files
db.initFiles();

// ============= USER ENDPOINTS =============

/**
 * POST /api/signup
 * Create a new user account
 * Body: { name, email, password }
 */
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required' });
    }

    const users = db.getUsers();
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const salt = await db.bcryptjs.genSalt(10);
    const hashedPassword = await db.bcryptjs.hash(password, salt);

    const newUser = {
      id: db.uuidv4(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    db.saveUsers(users);

    res.status(201).json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/login
 * Authenticate user
 * Body: { email, password }
 */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const users = db.getUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await db.bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/orders
 * Submit a new order (checkout)
 * Body: { userId, email, items: [{id, name, price, quantity}, ...], total }
 */
app.post('/api/orders', (req, res) => {
  try {
    const { userId, email, items, total } = req.body;

    if (!email || !items || !total) {
      return res.status(400).json({ error: 'email, items, and total are required' });
    }

    const order = {
      id: db.uuidv4(),
      userId,
      email,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const orders = db.getOrders();
    orders.push(order);
    db.saveOrders(orders);

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: order.id,
      order,
    });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/orders/:orderId
 * Get order details
 */
app.get('/api/orders/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = db.getOrders();
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`📝 CORS enabled for ${CORS_ORIGIN}`);
  console.log(`📂 Data stored in ${require('path').join(__dirname, 'data')}`);
});
