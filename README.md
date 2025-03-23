# RapiGo - A Web-Based Smart Ride-Sharing Solution

RapiGo is a full-stack ride-hailing application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that provides functionality similar to Ola/Rapido.

## 🚀 Features

- **User & Captain Authentication**
  - JWT-based authentication
  - Secure password hashing
  - Session management

- **Real-time Location Tracking**
  - Google Maps integration
  - Live location updates
  - Distance calculation

- **Ride Management**
  - Booking system
  - Fare calculation
  - OTP verification
  - Ride status tracking

- **Payment Integration**
  - Razorpay payment gateway
  - Secure transaction handling

## 🛠️ Tech Stack

- **Frontend**: React.js, TailwindCSS, Socket.io-client
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB
- **APIs**: Google Maps, Razorpay
- **Authentication**: JWT

## 🌟 Key Components

### Backend
- RESTful API endpoints
- Real-time WebSocket communication
- Geolocation services
- Payment processing

### Frontend
- Responsive UI with TailwindCSS
- Real-time location tracking
- Interactive map interface
- Live ride status updates

## 📝 Environment Variables

Create `.env` files in both frontend and backend directories with the following:

```env
# Backend
PORT=4000
DB_CONNECT=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API=your_google_maps_api_key
RAZORPAY_TEST_MODE_KEY_ID=your_razorpay_key
RAZORPAY_TEST_MODE_KEY_SECRET=your_razorpay_secret

# Frontend
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API=your_google_maps_api_key
VITE_RAZORPAY_TEST_MODE_KEY_ID=your_razorpay_key
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies in both frontend and backend:
   ```bash
   cd Frontend && npm install
   cd Backend && npm install
   ```
3. Set up environment variables
4. Start the servers:
   ```bash
   # Backend
   npm start
   
   # Frontend
   npm run dev
   ```

## 📱 Screenshots
<img src="./Screenshots/1.jpg" alt="Screenshot" width="200" style="padding: 10px;">
<img src="./Screenshots/4.jpg" alt="Screenshot" width="200" style="padding: 10px;">
<img src="./Screenshots/5.jpg" alt="Screenshot" width="200" style="padding: 10px;">
<img src="./Screenshots/7.jpg" alt="Screenshot" width="200" style="padding: 10px;">
<img src="./Screenshots/8.jpg" alt="Screenshot" width="200" style="padding: 10px;">
<img src="./Screenshots/9.jpg" alt="Screenshot" width="200" style="padding: 10px;">
<img src="./Screenshots/10.jpg" alt="Screenshot" width="200" style="padding: 10px;">
<img src="./Screenshots/11.jpg" alt="Screenshot" width="200" style="padding: 10px;">


