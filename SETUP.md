# Kamerwork - Environment Setup Guide

This guide provides step-by-step instructions to set up the Kamerwork development environment, including MongoDB database setup with MongoDB Compass for easy database management.

## Table of Contents
- [Prerequisites](#prerequisites)
- [MongoDB Setup](#mongodb-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [MongoDB Compass Guide](#mongodb-compass-guide)
- [Verification Checklist](#verification-checklist)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

### System Requirements
- **Windows 10/11** or **macOS** or **Linux**
- **Disk Space**: At least 2GB free
- **RAM**: 4GB minimum (8GB recommended)

### Required Software

1. **Java Development Kit (JDK) 11 or higher**
   - Download from: https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
   - Verify installation: Open terminal and run `java -version`
   
2. **Maven 3.6 or higher** (for building backend)
   - Download from: https://maven.apache.org/download.cgi
   - Verify installation: Open terminal and run `mvn -version`
   
3. **Node.js 18 or higher** (includes npm)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`
   
4. **Git** (for version control)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

5. **MongoDB Community Edition** (or MongoDB Atlas cloud)
   - Download from: https://www.mongodb.com/try/download/community
   - See [MongoDB Setup](#mongodb-setup) section for detailed instructions

---

## MongoDB Setup

### Option 1: Local MongoDB Installation (Recommended for Development)

#### Windows Installation

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Select:
     - OS: Windows
     - Version: Latest (Recommended)
     - Package: MSI
   - Click "Download"

2. **Run the MongoDB Installer**
   - Double-click the downloaded `.msi` file
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service" (recommended)
   - Click "Install"

3. **Verify Installation**
   ```bash
   mongod --version
   ```
   You should see version information

4. **Start MongoDB Service**
   - MongoDB should auto-start if installed as a service
   - Verify it's running by opening Task Manager → Services → MongoDB
   - Or start manually:
     ```bash
     mongod
     ```

#### macOS Installation

1. **Using Homebrew (Recommended)**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install MongoDB
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB**
   ```bash
   brew services start mongodb-community
   ```

3. **Verify Installation**
   ```bash
   mongod --version
   ```

#### Linux Installation (Ubuntu/Debian)

```bash
# Import the MongoDB repository
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

# Update package manager
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Option 2: MongoDB Atlas (Cloud Database)

1. **Create MongoDB Atlas Account**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a new project

2. **Create a Cluster**
   - Click "Create a Deployment"
   - Select "M0" (free tier)
   - Choose your preferred region (closest to you)
   - Click "Create Deployment"

3. **Get Connection String**
   - Go to "Database" → "Clusters" → "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials

4. **Update Backend Configuration**
   - Edit `kamerwork-backend/src/main/resources/application.yml`
   - Replace the MongoDB URI:
     ```yaml
     spring:
       data:
         mongodb:
           uri: mongodb+srv://username:password@cluster.mongodb.net/kamerwork
     ```

### Verify MongoDB Connection

Test your MongoDB connection:

```bash
# Open MongoDB shell
mongosh

# or for older versions
mongo

# Switch to kamerwork database
use kamerwork

# Show collections (should be empty initially)
show collections

# Exit
exit
```

---

## MongoDB Compass Setup

MongoDB Compass is a GUI tool for managing MongoDB databases. It makes it easy to visualize data, run queries, and manage your collections.

### Download and Install MongoDB Compass

1. **Download MongoDB Compass**
   - Visit: https://www.mongodb.com/products/tools/compass
   - Click "Download Compass"
   - Select your operating system
   - Download the installer

2. **Install Compass**
   - **Windows**: Run the `.exe` installer and follow prompts
   - **macOS**: Drag MongoDB Compass to Applications folder
   - **Linux**: Install via package manager or follow on-screen instructions

3. **Launch MongoDB Compass**
   - Windows: Start from Start Menu → "MongoDB Compass"
   - macOS: Open Applications → MongoDB Compass
   - Linux: Run `mongodb-compass` from terminal

### Connect to MongoDB using Compass

#### Local MongoDB Connection

1. **Open MongoDB Compass**
2. **Enter Connection String**
   - In the "New Connection" dialog, enter:
     ```
     mongodb://localhost:27017
     ```
   - Click "Connect"

3. **Verify Connection**
   - You should see the database list on the left sidebar
   - Initially, you'll see system databases

4. **Create Kamerwork Database** (if not exists)
   - Click the "+" button next to "Databases"
   - Database Name: `kamerwork`
   - Collection Name: `users` (optional)
   - Click "Create Database"

#### MongoDB Atlas Connection (Cloud)

1. **Get Connection String**
   - Go to MongoDB Atlas → Your Cluster
   - Click "Connect"
   - Select "Connect with MongoDB Compass"
   - Copy the connection string provided

2. **In MongoDB Compass**
   - Click "New Connection"
   - Paste your connection string
   - Click "Connect"

3. **Expected Result**
   - Connected to your Atlas cluster
   - See your databases and collections

### Using MongoDB Compass

**Viewing Collections**
- Left sidebar shows: Databases → Collections → Documents
- Click on any collection to view its documents
- Click on a document to see its fields and values

**Adding Test Data**
1. Click on a collection
2. Click "+ INSERT DOCUMENT"
3. Add JSON data:
   ```json
   {
     "email": "test@example.com",
     "name": "Test User",
     "role": "USER"
   }
   ```
4. Click "Insert"

**Querying Data**
- Click "FILTER" to add MongoDB query filters
- Example filter:
   ```json
   { "role": "EMPLOYER" }
   ```

**Deleting Documents**
- Right-click a document
- Select "Delete Document"
- Confirm deletion

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd kamerwork-backend
```

### Step 2: Install Dependencies

```bash
mvn install
```

This command:
- Downloads all project dependencies from Maven Central Repository
- Compiles the Java source code
- Creates necessary build artifacts
- Takes 3-5 minutes on first run

### Step 3: Verify MongoDB Connection Configuration

Edit `src/main/resources/application.yml`:

```yaml
spring:
  application:
    name: kamerwork-backend
  data:
    mongodb:
      uri: mongodb://localhost:27017/kamerwork  # Update if using Atlas
  mail:
    enabled: false  # Enable only if you've set up email
    host: smtp.gmail.com
    port: 587
    username: ${MAIL_USERNAME:your-email@gmail.com}
    password: ${MAIL_PASSWORD:your-app-password}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
            required: true
  
server:
  port: 8081
  servlet:
    context-path: /api

recaptcha:
  enabled: false  # Enable if you've set up reCAPTCHA
  secret: ${RECAPTCHA_SECRET:6LeJXpksAAAAALFkDcpvugX2KbKrvLy9aKPDdY8-}

logging:
  level:
    root: INFO
    org.springframework.boot: DEBUG
```

**Configuration Details:**
- `mongodb.uri`: Connection string to your MongoDB
- `mail.enabled`: Set to `true` if you've configured email
- `recaptcha.enabled`: Set to `true` if you've set up Google reCAPTCHA
- `server.port`: Backend API port (8081)
- `context-path`: API endpoint prefix (/api)

### Step 4: Run the Backend

```bash
mvn spring-boot:run
```

**Expected Output:**
```
2026-04-17 10:30:45.123  INFO 12345 --- [main] com.kamerwork.Main  : Starting Main
...
2026-04-17 10:30:52.456  INFO 12345 --- [main] org.springframework.boot.web.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8081
```

**Backend is ready when you see:**
- "Tomcat started on port(s): 8081"
- No error messages

### Troubleshooting Backend

**MongoDB Connection Failed:**
- Verify MongoDB is running: `mongod` in another terminal
- Check connection string in `application.yml`
- Use MongoDB Compass to test connection

**Port 8081 Already in Use:**
- Windows: `netstat -ano | findstr :8081`
- macOS/Linux: `lsof -i :8081`
- Kill the process or change port in `application.yml`

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd kamerwork-frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This command:
- Downloads all npm packages listed in `package.json`
- Installs React, Vite, Axios, and other libraries
- Takes 2-3 minutes on first run

### Step 3: Verify API Configuration

Check `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8081/api';
```

Ensure the URL matches your backend configuration.

### Step 4: Run the Frontend Development Server

```bash
npm run dev
```

**Expected Output:**
```
  VITE v8.0.1  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Understanding Frontend Structure

- **src/pages/**: Page components (Login, Dashboard, etc.)
- **src/components/**: Reusable components (Navbar, etc.)
- **src/services/**: API calls and audit logging
- **src/styles/**: CSS files
- **public/**: Static assets

### Frontend Troubleshooting

**Port 5173 Already in Use:**
- Windows: `netstat -ano | findstr :5173`
- macOS/Linux: `lsof -i :5173`
- Kill the process or use different port

**Module Not Found:**
- Delete `node_modules` folder: `rm -rf node_modules`
- Clear npm cache: `npm cache clean --force`
- Reinstall: `npm install`

---

## Running the Application

### Terminal Setup for Full Stack

It's best to run backend and frontend in separate terminals:

#### Terminal 1 - Backend

```bash
cd kamerwork-backend
mvn spring-boot:run
```

Wait until you see "Tomcat started on port(s): 8081"

#### Terminal 2 - Frontend

```bash
cd kamerwork-frontend
npm run dev
```

Wait until you see "ready in XXX ms"

#### Terminal 3 - MongoDB (if running locally)

```bash
mongod
```

Or verify it's running as a service in Task Manager/Services

### Access the Application

Open your browser and navigate to:

- **Frontend**: http://localhost:5173
- **API Endpoints**: http://localhost:8081/api
- **MongoDB**: mongodb://localhost:27017/kamerwork (use MongoDB Compass to connect)

### Test Login

1. Go to http://localhost:5173
2. Click "Register" to create a new account
3. Or use existing credentials if database is pre-populated
4. Check audit logs in SuperAdmin portal at http://localhost:5173/admin/login
   - **Secret Key**: `SUPERADMIN_SECRET_2026`

---

## MongoDB Compass Guide

### Common Tasks

#### View Collections
1. Open MongoDB Compass
2. Click on `kamerwork` database in left sidebar
3. See all collections (users, audit_logs, etc.)

#### Query Data
1. Click on a collection
2. Click "ADD FILTER" button
3. Enter MongoDB query:
   ```json
   { "email": "user@example.com" }
   ```
4. Click "Find"

#### Export Data
1. Right-click on collection
2. Select "Export Collection"
3. Choose format (JSON, CSV)
4. Select export location

#### Create Backup
1. In terminal:
   ```bash
   mongodump --uri="mongodb://localhost:27017/kamerwork" --out=./backup
   ```

#### Restore Backup
```bash
mongorestore --uri="mongodb://localhost:27017/kamerwork" ./backup/kamerwork
```

#### View Audit Logs
1. Open MongoDB Compass
2. Navigate to: `kamerwork` → `audit_logs`
3. View all user activities
4. Click on document to see details:
   - User email
   - Action performed
   - Timestamp
   - Session ID
   - IP address
   - Duration metrics

---

## Verification Checklist

Use this checklist to verify your setup is complete:

- [ ] Java 11+ installed (`java -version` shows version 11+)
- [ ] Maven installed (`mvn -version` shows version)
- [ ] Node.js 18+ installed (`node --version` and `npm --version`)
- [ ] Git installed (`git --version`)
- [ ] MongoDB running (can connect with MongoDB Compass)
- [ ] MongoDB Compass installed and can connect
- [ ] Kamerwork database created in MongoDB
- [ ] Backend dependencies installed (`mvn install` completed)
- [ ] Frontend dependencies installed (`npm install` completed)
- [ ] Backend running on port 8081 (Terminal 1)
- [ ] Frontend running on port 5173 (Terminal 2)
- [ ] Can access http://localhost:5173 in browser
- [ ] Can register/login successfully
- [ ] Can view audit logs in MongoDB Compass

## Building for Production

### Backend

```bash
cd kamerwork-backend
mvn clean package -DskipTests
```

Creates: `target/kamerwork-1.0-SNAPSHOT.jar`

### Frontend

```bash
cd kamerwork-frontend
npm run build
```

Creates: `dist/` folder with optimized build

---

## Troubleshooting

### "MongoDB Connection Refused"

**Solution:**
```bash
# Check if MongoDB is running
mongod

# If not running, start it:
# Windows: sc start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### "Cannot find module 'java'"

**Solution:**
```bash
# Install Java from https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
# Then verify: java -version
# Add JAVA_HOME to environment variables
```

### "npm ERR! 404"

**Solution:**
```bash
npm cache clean --force
npm install
```

### "Port Already in Use"

**Windows:**
```bash
# Find and kill process on port
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -i :8081
kill -9 <PID>
```

### Frontend Shows "Cannot Connect to API"

**Solution:**
- Verify backend is running on 8081
- Check `src/services/api.js` has correct URL
- Check browser console for errors (F12)
- Verify CORS is enabled in backend

### "CORS Error in Browser Console"

**Solution:**
- Ensure backend is running
- Check API URL in frontend matches backend
- Restart both frontend and backend

### No Data Shows in MongoDB Compass

**Solution:**
- Verify MongoDB is running
- Try registering a new user in the app
- Refresh MongoDB Compass
- Check `kamerwork` database exists

---

## Next Steps

After setup is complete:

1. **Explore the Project Structure**: Review the code in `src/` directories
2. **Read Documentation**: Check [README.md](./README.md), [AUDIT_LOGGING_SYSTEM.md](./AUDIT_LOGGING_SYSTEM.md)
3. **Test Features**: Register account, create jobs, apply for positions
4. **View Audit Logs**: Use MongoDB Compass to inspect user activities
5. **Access SuperAdmin Portal**: Visit http://localhost:5173/admin/login
6. **Start Contributing**: Create a new branch and implement features

## Support & Resources

- **MongoDB Documentation**: https://docs.mongodb.com/manual/
- **MongoDB Compass Guide**: https://docs.mongodb.com/compass/master/
- **Spring Boot Documentation**: https://spring.io/projects/spring-boot
- **React Documentation**: https://react.dev
- **Vite Documentation**: https://vitejs.dev/guide/

---

**Last Updated**: April 2026
**For Issues or Questions**: Refer to README.md or specific feature documentation
