# E-Commerce Application

A comprehensive e-commerce platform developed using the MERN stack, providing secure authentication, seamless payment processing, real-time inventory management, and an admin module for efficient platform management.

## Features

### User Features
- **JWT-Based Authentication:** Secure login and registration for users.
- **Product Listing:** Browse a variety of products with detailed descriptions.
- **Real-Time Payment Processing:** Integrated payment gateway for smooth and secure transactions.
- **Order Tracking and Returns:** Real-time updates on order status and a hassle-free return process.

### Admin Features
- **Admin Dashboard:** Manage the platform, including users, orders, and product inventory.
- **User Management:** Add, update, or remove users from the platform.
- **Order Management:** View, process, and verify customer orders.
- **Inventory Management:** Maintain product stock in real-time.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Payment Gateway:** Razorpay (for secure and real-time payment processing)

## Deployment
The application is deployed on [Vercel](https://vercel.com) and can be accessed via the following link:

[Live Demo](https://mosin-shop.vercel.app)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ecommerce-app
   ```

3. Install dependencies for the backend and frontend:
   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory with the following:
     ```
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     RAZORPAY_KEY_ID=<your-razorpay-key-id>
     RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
     ```

5. Start the development server:
   - For the backend:
     ```bash
     cd backend
     npm run dev
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm start
     ```

6. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
E-Commerce Application
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   ├── index.js
├── README.md
```


## Acknowledgments
- **Razorpay** for the payment gateway integration.
- **MongoDB Atlas** for cloud-hosted database solutions.
- **Tailwind CSS** for responsive and modern design.

---

Feel free to contribute to this project by submitting issues or pull requests!
