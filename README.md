# Brown Green Retail - E-Commerce App

A modern responsive e-commerce web application with React frontend and Node.js backend.

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ User authentication (signup/login with password hashing)
- ✅ Product catalog with cart management
- ✅ Quantity increment/decrement controls
- ✅ Order checkout via backend API
- ✅ User data persistence with Node.js and JSON files
- ✅ Company info and contact page with social links

## Project Structure

```
brown-green-retail/
├── src/                      # React frontend
│   ├── components/           # React components
│   │   ├── Header.js
│   │   ├── Home.js
│   │   ├── ProductList.js
│   │   ├── Cart.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── Shop.css          # Responsive styles (mobile/tablet/desktop)
│   ├── data/
│   │   └── products.js
│   ├── App.js
│   └── index.js
├── backend/                  # Node.js backend with Express
│   ├── server.js             # Express server with API routes
│   ├── db.js                 # JSON file-based data persistence
│   ├── package.json
│   ├── .env.example
│   └── data/                 # JSON data files (auto-created)
│       ├── users.json
│       └── orders.json
├── package.json
└── README.md
```

## Quick Start

### 1. Install & Run Backend

```powershell
cd backend
npm install
copy .env.example .env
npm start
```

Backend runs on `http://localhost:5000`

### 2. Install & Run Frontend (New Terminal)

```powershell
npm install
copy .env.example .env
npm start
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### Authentication

- **POST** `/api/signup` - Create account

  ```json
  { "name": "John", "email": "john@example.com", "password": "pass123" }
  ```

- **POST** `/api/login` - Login
  ```json
  { "email": "john@example.com", "password": "pass123" }
  ```

### Orders

- **POST** `/api/orders` - Submit order

  ```json
  { "email": "user@example.com", "items": [...], "total": 99.99 }
  ```

- **GET** `/api/orders/:orderId` - Get order details

## Responsive Design

Fully responsive with optimized layouts for:

- **Desktop** (1024px+): 4-column product grid, horizontal navigation
- **Tablet** (768px - 1024px): 3-column grid, wrapped navigation
- **Mobile** (480px - 768px): 2-column grid, stacked cart items
- **Small Mobile** (< 480px): Single column, compact controls

## Environment Variables

**Frontend (.env):**

```
REACT_APP_API_BASE=http://localhost:5000
```

**Backend (.env):**

```
PORT=5000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

## Data Storage

- **Users**: `backend/data/users.json` (passwords hashed with bcryptjs)
- **Orders**: `backend/data/orders.json`
- **Session**: `localStorage` (frontend)

## Testing the App

1. **Home Page**: `/` - View company info and social links
2. **Shop**: `/shop` - Browse products and add to cart
3. **Signup**: `/signup` - Create a new account
4. **Login**: `/login` - Login with credentials
5. **Cart**: `/cart` - Review cart, adjust quantities, checkout

## Mobile Testing

Test responsiveness using:

- Browser DevTools (F12) → Toggle device toolbar
- Resize browser window to trigger media queries

## Troubleshooting

| Issue                        | Solution                                                   |
| ---------------------------- | ---------------------------------------------------------- |
| Backend won't start          | Check port 5000 is free; ensure Node.js installed          |
| Frontend can't reach API     | Verify `REACT_APP_API_BASE` env var and backend is running |
| Signup/login fails           | Check `backend/data/users.json` exists and is writable     |
| Styles not loading on mobile | Clear browser cache (Ctrl+Shift+Delete)                    |

## Available Scripts

### Frontend

- `npm start` - Run dev server (port 3000)
- `npm run build` - Build for production
- `npm test` - Run tests

### Backend

- `npm start` - Run server (port 5000)
- `npm run dev` - Run with nodemon (auto-restart on changes)

## Future Enhancements

- [ ] Real database (MongoDB/PostgreSQL)
- [ ] Payment processing (Stripe/PayPal)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Product search & filtering
- [ ] JWT authentication tokens
- [ ] Rate limiting & security headers
- [ ] Order tracking
- [ ] User reviews & ratings

## License

MIT
