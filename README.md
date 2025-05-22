
# 🛒 Full Stack E-Commerce Web Application

This is a complete full-stack E-Commerce platform built using **React (Vite)** for the frontend, **Node.js + Express** for the backend, and integrates with **MongoDB**, **Firebase**, and **Cloudinary** for database, authentication, and media storage respectively.

---

## 📁 Project Structure

```
ECOM/
│
├── client/               # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/       # Static assets like images and icons
│   │   ├── components/   # Reusable React components
│   │   ├── Context/      # React Context for global state
│   │   ├── pages/        # Page components (e.g., Home, Product, Cart)
│   │   ├── services/     # API service files
│   │   ├── App.jsx       # App entry point
│   │   ├── main.jsx      # React DOM mount
│   │   ├── endpoint.js   # API base URL
│   │   ├── FirebaseConfig.js # Firebase client SDK config
│   ├── .env              # Frontend env vars
│   └── ...
│
├── server/               # Backend (Node.js + Express)
│   ├── config/           # Database and Cloudinary config
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── firebaseAdmin.js
│   ├── controllers/      # Request handlers for different routes
│   ├── functions/        # Utility functions
│   ├── middleware/       # Auth & validation middleware
│   ├── models/           # Mongoose schemas: Product, Order, User, etc.
│   ├── routes/           # Route definitions
│   ├── uploads/          # Temporarily uploaded files
│   ├── .env              # Backend env vars
│   └── index.js          # App entry point
│
└── README.md             # You're reading it!
```

---

## 🚀 Features

### Frontend (React + Vite)
- Product listing, filtering, and category pages
- Shopping cart and checkout flow
- User login/signup with **Firebase Authentication**
- Firebase token-based auth persistence
- Context API for global cart and user state
- Mobile responsive UI

### Backend (Node.js + Express + MongoDB)
- Authentication using Firebase Admin SDK
- RESTful APIs for:
  - Products
  - Categories
  - Carousels
  - Orders
  - Cart
  - Purchase
- **MongoDB** for data storage via **Mongoose**
- Image uploads with **Cloudinary**
- Admin middleware for protected routes

---

## 🧩 Tech Stack

| Layer      | Technology           |
|------------|----------------------|
| Frontend   | React, Vite, CSS     |
| Backend    | Node.js, Express     |
| Database   | MongoDB (Mongoose)   |
| Auth       | Firebase             |
| Media      | Cloudinary           |
| Deployment | Vercel (Frontend), Render/Heroku (Backend) |

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ecom-project.git
cd ecom-project
```

---

### 2. Frontend Setup (`client`)

```bash
cd client
npm install
```

#### Add `.env` file:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_API_ENDPOINT=http://localhost:5000/api
```

To run the client:
```bash
npm run dev
```

---

### 3. Backend Setup (`server`)

```bash
cd server
npm install
```

#### Add `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_key_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your_cert_url
```

To run the server:
```bash
npm start
```

---

## 🔐 Authentication

- **Frontend:** Uses Firebase SDK for login/signup (email/password or provider)
- **Backend:** Validates Firebase tokens using `firebaseAdmin.js`
- Middleware like `verifyFirebaseToken.js` ensures protected routes are only accessed by authenticated users
- Admin routes protected by `checkAdmin.js` middleware

---

## ☁️ Cloudinary

Images uploaded via API are stored in Cloudinary using `upload.js` middleware. Cloudinary URLs are returned and saved in MongoDB for frontend rendering.

---

## 🧪 API Endpoints

| Route Group     | Path                  | Description                        |
|-----------------|-----------------------|------------------------------------|
| Auth            | `/api/auth`           | Firebase token-based login         |
| Product         | `/api/products`       | CRUD for products                  |
| Category        | `/api/categories`     | Manage product categories          |
| Carousel        | `/api/carousels`      | Home page carousel items           |
| Cart            | `/api/cart`           | User cart operations               |
| Order           | `/api/orders`         | Checkout, place order              |
| Purchase        | `/api/purchase`       | Admin purchases view               |
| Location        | `/api/locations`      | Location-based filtering           |

---

## 📦 Deployment

- **Frontend:** Deployed to [Vercel](https://furnishrent.vercel.app/)
- **Backend:** Deployed to [Vercel](https://furnishrent-kp94.vercel.app/) 
- Set env vars in respective dashboards

---


## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

