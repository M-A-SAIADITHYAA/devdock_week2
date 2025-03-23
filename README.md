# Code Marketplace

A platform where developers can buy, sell, and share code snippets. Built with React, Node.js, Express, and MongoDB.

## Features

- 🔐 User Authentication (Register/Login)
- 📝 Code Listing Creation
- 🏷️ Hashtag-based Search
- 🔍 Advanced Filtering
- 💻 GitHub Repository Integration
- 🎨 Modern, Responsive UI

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Modern CSS with Flexbox/Grid
- Google Fonts (Inter & Poppins)

### Backend
- Node.js & Express
- MongoDB for database
- JWT for authentication
- bcrypt for password hashing

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running
- Git (optional)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/M-A-SAIADITHYAA/devdock_week2.git
cd code-marketplace
```

2. Install Backend Dependencies:
```bash
cd backend
npm install
```

3. Install Frontend Dependencies:
```bash
cd ../frontend
npm install
```



## Running the Application

1. Start MongoDB:
   - Make sure MongoDB is running on your system
   - Default MongoDB URL: `mongodb://localhost:27017`

2. Start the Backend Server:
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

3. Start the Frontend Development Server:
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000

## Project Structure

```
code-marketplace/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.tsx
│   └── package.json
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Code Listings
- POST `/api/codes/upload` - Upload new code
- GET `/api/codes` - Get all code listings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Demo


https://github.com/user-attachments/assets/4dae8087-3a2e-484f-ba29-cd172c43ae7c


