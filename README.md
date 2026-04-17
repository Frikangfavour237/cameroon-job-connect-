# Kamerwork - Job Platform

A full-stack job platform application built with React (Frontend) and Spring Boot (Backend), with MongoDB as the database. The platform includes employer and candidate management features with comprehensive audit logging and role-based access control.

## 📋 Project Overview

**Kamerwork** is a modern job marketplace connecting employers with candidates. The platform features:

- ✅ User authentication with JWT tokens
- ✅ Employer dashboard with job management
- ✅ Candidate profiles and job applications
- ✅ Email notifications (Gmail integration)
- ✅ Comprehensive audit logging system
- ✅ SuperAdmin audit logging portal
- ✅ Password reset functionality with email verification
- ✅ CAPTCHA integration for security
- ✅ Activity tracking and user behavior monitoring

## 🏗️ Project Structure

```
kamerwork/
├── kamerwork-backend/          # Spring Boot application
│   ├── src/
│   │   ├── main/java/          # Java source code
│   │   │   └── com/kamerwork/
│   │   │       ├── config/     # Security & Filter configs
│   │   │       ├── controllers/# API endpoints
│   │   │       ├── services/   # Business logic
│   │   │       ├── models/     # MongoDB entities
│   │   │       ├── dto/        # Data transfer objects
│   │   │       └── repositories/ # Database queries
│   │   └── resources/
│   │       └── application.yml # Configuration
│   └── pom.xml                 # Maven dependencies
│
├── kamerwork-frontend/         # React + Vite application
│   ├── src/
│   │   ├── pages/              # Page components
│   │   ├── components/         # Reusable components
│   │   ├── services/           # API & audit services
│   │   ├── styles/             # CSS stylesheets
│   │   └── main.jsx            # Entry point
│   ├── package.json            # NPM dependencies
│   └── vite.config.js          # Vite configuration
│
├── AUDIT_LOGGING_SETUP.md      # Audit logging implementation guide
├── AUDIT_LOGGING_SYSTEM.md     # Audit system documentation
├── SUPERADMIN_PORTAL.md        # SuperAdmin portal guide
└── SETUP.md                    # Environment setup guide (this file)
```

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 2.7.17
- **Language**: Java 11
- **Build Tool**: Maven
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Spring Security
- **Email**: Spring Mail

### Frontend
- **Library**: React 19
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Security**: Google reCAPTCHA

## 📚 Documentation

This project includes detailed documentation for:

1. **[SETUP.md](./SETUP.md)** - Step-by-step environment setup including MongoDB Compass installation
2. **[AUDIT_LOGGING_SYSTEM.md](./AUDIT_LOGGING_SYSTEM.md)** - Comprehensive audit logging system documentation
3. **[AUDIT_LOGGING_SETUP.md](./AUDIT_LOGGING_SETUP.md)** - Quick setup guide for audit logging
4. **[SUPERADMIN_PORTAL.md](./SUPERADMIN_PORTAL.md)** - SuperAdmin portal and audit log viewing guide

## 🚀 Quick Start

For detailed setup instructions, see [SETUP.md](./SETUP.md).

### Prerequisites
- Java 11+
- Node.js 18+
- MongoDB 4.4+
- Git

### Quick Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd kamerwork

# 2. Backend setup
cd kamerwork-backend
mvn install
mvn spring-boot:run

# 3. Frontend setup (in another terminal)
cd kamerwork-frontend
npm install
npm run dev
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8081/api
- **MongoDB**: mongodb://localhost:27017/kamerwork
- **SuperAdmin Portal**: http://localhost:5173/admin/login

## 📖 Key Features

### Authentication & Authorization
- User registration and login
- Email-based password reset
- JWT-based session management
- Role-based access control (SUPERADMIN, USER, EMPLOYER)
- CAPTCHA verification for security

### Audit Logging
- Complete user action tracking
- Login/logout activity monitoring
- Failed login attempt recording
- Dashboard access timing
- IP address and browser tracking
- Session duration monitoring

### SuperAdmin Portal
- View all system audit logs
- Filter by email, action type, or session
- Monitor user activities
- Track failed login attempts
- Analyze system usage patterns

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `POST /api/auth/logout` - User logout

### Audit Logs
- `GET /api/audit-logs` - Get all audit logs
- `GET /api/audit-logs/email/{email}` - Get logs for specific user
- `GET /api/audit-logs/action/{action}` - Get logs by action type
- `GET /api/audit-logs/session/{sessionId}` - Get logs for session

## 🗂️ Database Schema

### Collections
- **users** - User accounts and profiles
- **audit_logs** - System activity tracking
- **password_reset_tokens** - Password reset tokens

### Sample MongoDB Connection
```
mongodb://localhost:27017/kamerwork
```

For MongoDB Compass GUI connection, see [SETUP.md](./SETUP.md).

## 👥 Contributing

### Getting Started
1. Follow the setup guide in [SETUP.md](./SETUP.md)
2. Create a new branch for your feature
3. Make your changes following the project structure
4. Test thoroughly
5. Commit with clear messages
6. Push and create a pull request

### Code Structure Guidelines
- **Backend**: Follow Spring Boot conventions, keep business logic in services
- **Frontend**: Use functional components, organize by feature
- **Database**: Use MongoDB best practices for schema design

### Running Tests
```bash
# Backend
cd kamerwork-backend
mvn test

# Frontend
cd kamerwork-frontend
npm run lint
```

## 🔐 Environment Variables

Key environment variables for configuration:

### Backend (`application.yml`)
- `MAIL_USERNAME` - Gmail address for sending emails
- `MAIL_PASSWORD` - Gmail app-specific password
- `RECAPTCHA_SECRET` - Google reCAPTCHA secret key
- `spring.data.mongodb.uri` - MongoDB connection string

### Frontend (`.env` or `vite.config.js`)
- `VITE_API_URL` - Backend API base URL

## 🐛 Troubleshooting

### MongoDB Connection Issues
1. Ensure MongoDB is running: `mongod`
2. Verify connection string in `application.yml`
3. Check MongoDB is listening on port 27017
4. Use MongoDB Compass to test connection (see SETUP.md)

### Backend Won't Start
1. Verify Java 11+ is installed: `java -version`
2. Check Maven: `mvn -version`
3. Clean and rebuild: `mvn clean install`
4. Check logs for specific errors

### Frontend Issues
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear Vite cache: `npm run dev --force`
3. Check Node version: `node --version` (should be 18+)

### Port Already in Use
```bash
# Kill process on port 8081 (backend)
lsof -ti:8081 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

## 📧 Email Configuration

To enable email functionality:

1. Enable Gmail app-specific passwords
2. Set environment variables:
   ```
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-specific-password
   ```
3. Set `mail.enabled: true` in `application.yml`

## 🔒 Security Considerations

- ✅ JWT tokens for stateless authentication
- ✅ Password hashing with Spring Security
- ✅ CAPTCHA verification for public forms
- ✅ Audit logging for compliance
- ✅ Role-based access control
- ✅ Input validation and sanitization
- ✅ CORS configuration for frontend origin
- ✅ HTTP-only cookies for sensitive data

## 📞 Support

For issues or questions:
1. Check the relevant documentation file
2. Review the troubleshooting section
3. Check application logs for error details
4. Create an issue with detailed description

## 📄 License

[Add your license information here]

## 👨‍💻 Development Team

Kamerwork Platform Development

---

**Last Updated**: April 2026
