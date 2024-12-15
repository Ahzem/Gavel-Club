# 🎤 Gavel Club of ITUM - Official Website

<p align="center">
  <img src="./Client/src/assets/logowithname.png" alt="Gavel Club Logo" width="200"/>
</p>

> A modern web platform for the Gavel Club of Institute of Technology, University of Moratuwa, built with React, Node.js, and MongoDB.

[![Build Status](https://github.com/Ahzem/Gavel-Club/workflows/Build%20and%20deploy%20Node.js%20app%20to%20Azure%20Web%20App/badge.svg)](https://github.com/Ahzem/Gavel-Club/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

- 🏠 Dynamic Homepage with Modern UI/UX
- 👥 Team Members Management
- 📅 Events Calendar & Management
- 📸 Gallery Management System
- 📝 Blog System
- 🔐 Secure Admin Dashboard
- 🎫 Membership Management
- 📱 Responsive Design
- ☁️ Cloud-based Image Storage

## 🛠️ Tech Stack

### Frontend
- React (TypeScript)
- Vite
- React Router DOM
- Radix UI Components
- Framer Motion
- TipTap Editor
- Three.js/React Three Fiber
- Tailwind CSS
- EmailJS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary
- Azure Web Apps

### DevOps & Deployment
- Azure Static Web Apps
- Azure Web Services
- GitHub Actions

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- MongoDB Atlas Account
- Cloudinary Account
- Azure Account (for deployment)

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/Gavel-Club.git
cd Gavel-Club
```

2. **Install Dependencies**
```bash
# Install Client Dependencies
cd Client
npm install

# Install Server Dependencies
cd ../Server
npm install
```

3. **Environment Variables**

Client (.env):
```env
VITE_API_URL=http://localhost:8080
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_TO_EMAIL=your_email
```

Server (.env):
```env
PORT=8080
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Run Development Servers**
```bash
# Run Client (from Client directory)
npm run dev

# Run Server (from Server directory)
npm run dev
```

## 📦 Project Structure

```
Gavel-Club/
├── Client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context providers
│   │   ├── services/     # API services
│   │   └── styles/       # CSS styles
│   └── public/           # Static assets
├── Server/                # Backend Node.js Application
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   └── utils/        # Utility functions
│   └── tests/            # Backend tests
└── .github/              # GitHub Actions workflows
```

## 🔒 Security Features

- CORS Protection
- Rate Limiting
- Helmet Security Headers
- JWT Authentication
- Input Validation
- XSS Protection
- CSRF Protection

## 🚀 Deployment

The application is deployed using Azure services:
- Frontend: Azure Static Web Apps
- Backend: Azure Web Apps
- Database: MongoDB Atlas
- Media Storage: Cloudinary

Deployment is automated through GitHub Actions workflows:
- 

`deploy_gavel-club.yml`

 for backend deployment
- 

`azure-static-web-apps-mango-bush-0b7a83b00.yml`

 for frontend deployment

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Events Endpoints
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

[More endpoints documentation...]

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👥 Team

- Frontend Developer - [Name]
- Backend Developer - [Name]
- UI/UX Designer - [Name]
- Project Manager - [Name]

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Cloudinary](https://cloudinary.com/)
- [Azure](https://azure.microsoft.com/)

## 📞 Contact

For any queries or support, please contact:
- Email: muhammadhahzem1422@gmail.com
- Website: [https://ahzem.github.io/Portfolio/]
- LinkedIn: [https://www.linkedin.com/in/Ahzem/]
- Twitter: [@_ahzem_]
