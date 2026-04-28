# Setup & Installation Guide

## Complete Step-by-Step Instructions

This guide walks you through setting up and running the Student Feedback Management System.

## Phase 1: Prerequisites Installation

### 1. Install Node.js
1. Go to [nodejs.org](https://nodejs.org)
2. Download LTS version (v18 or higher)
3. Run installer and follow setup wizard
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### 2. Install MongoDB

#### Option A: Local MongoDB Installation
1. Download from [mongodb.com/try/download](https://www.mongodb.com/try/download/community)
2. Run installer (use default settings)
3. MongoDB Community Server starts automatically

#### Option B: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string from Atlas

## Phase 2: Backend Setup

### Step 1: Create Backend Environment

```bash
cd OEL-WEB/backend
npm install
```

### Step 2: Configure Environment Variables

Create file `.env` in `backend/` folder:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/feedback-management
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/feedback-management

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_in_production_12345

# Admin Configuration
ADMIN_PASSWORD=admin123

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

### Step 3: Start Backend Server

```bash
npm run dev
```

**Expected Output:**
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
📝 API Documentation: http://localhost:5000
```

### Backend Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Check MongoDB is running. On Windows: `net start MongoDB` |
| Port 5000 already in use | Change PORT in .env or kill process using: `netstat -ano \| findstr :5000` |
| Module not found | Run `npm install` again |

## Phase 3: Frontend Setup

### Step 1: Create Frontend Environment

Open **new terminal** and run:

```bash
cd OEL-WEB/frontend
npm install
```

### Step 2: Start Frontend Server

```bash
npm run dev
```

**Expected Output:**
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

## Phase 4: Verify Installation

### 1. Backend Verification
- Open `http://localhost:5000` in browser
- Should show API documentation

### 2. Frontend Verification
- Frontend automatically opens at `http://localhost:5173`
- You should see the Feedback Management System

### 3. Test API Connection
Open terminal and run:
```bash
curl http://localhost:5000/api/feedback \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Test Student",
    "email": "test@example.com",
    "subject": "Mathematics",
    "rating": 5,
    "comments": "Test feedback"
  }'
```

Should return success response with feedback data.

## Phase 5: Testing the Application

### Test 1: Submit Feedback (Student Mode)

1. Go to `http://localhost:5173`
2. Fill in all fields:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Subject: "Mathematics"
   - Rating: 5 stars
   - Comments: "Great class"
3. Click "Submit Feedback"
4. Should see green success message

### Test 2: View Feedbacks

1. Scroll down to see your submitted feedback
2. Test search functionality
3. Test subject filter buttons

### Test 3: Admin Login

1. Click "Admin Mode" button
2. Login with credentials:
   - Username: `admin`
   - Password: `admin123`
3. Should see admin dashboard

### Test 4: Admin Dashboard

1. View statistics and analytics
2. Go to "All Feedback" tab
3. Test filtering by subject
4. Test pagination

## Phase 6: Development Workflow

### File Structure Overview

```
OEL-WEB/
├── backend/
│   ├── src/
│   │   ├── models/        → Database schemas
│   │   ├── routes/        → API endpoints
│   │   ├── controllers/   → Business logic
│   │   ├── middleware/    → Validation & auth
│   │   └── config/        → Configuration files
│   ├── package.json       → Dependencies
│   └── .env              → Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/    → React components
    │   ├── styles/        → CSS files
    │   └── App.jsx        → Main app
    ├── public/
    │   └── index.html     → HTML template
    └── package.json       → Dependencies
```

### Making Changes

#### Backend Changes
1. Edit files in `backend/src/`
2. Server automatically reloads (nodemon)
3. Check terminal for errors
4. Test endpoints using API documentation

#### Frontend Changes
1. Edit files in `frontend/src/`
2. Browser automatically reloads (Vite HMR)
3. Check browser console for errors
4. Changes appear instantly

### Common Development Tasks

#### Add New API Endpoint

1. Create controller in `backend/src/controllers/`
2. Create route in `backend/src/routes/`
3. Add validation middleware if needed
4. Test with curl or Postman

#### Add New React Component

1. Create `.jsx` file in `frontend/src/components/`
2. Create corresponding `.css` file in `frontend/src/styles/`
3. Import and use in parent component
4. Test in browser

#### Update Database Schema

1. Edit model file in `backend/src/models/`
2. Add validation rules
3. Restart backend server
4. Clear MongoDB or update existing data

## Phase 7: Production Deployment

### Before Deployment

1. **Update .env for production:**
   ```env
   NODE_ENV=production
   JWT_SECRET=strong_random_secret_key
   ADMIN_PASSWORD=secure_password_change_this
   ```

2. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```
   This creates `frontend/dist/` folder

3. **Security Checklist:**
   - [ ] Change JWT_SECRET to strong random value
   - [ ] Change ADMIN_PASSWORD
   - [ ] Use MongoDB Atlas for cloud database
   - [ ] Set CORS to specific frontend domain
   - [ ] Remove console.logs from code
   - [ ] Enable HTTPS

### Deployment Platforms

#### Deploy Backend (Node.js)
- **Heroku**: Free tier available
- **Render**: Easy deployment, free tier
- **Railway**: Modern platform, generous free tier
- **Fly.io**: Global deployment

#### Deploy Frontend (React)
- **Vercel**: Optimized for React/Vite
- **Netlify**: Easy drag-and-drop
- **GitHub Pages**: Free, static hosting

## Troubleshooting Guide

### Common Issues & Solutions

#### 1. "Cannot find module" Error
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 2. MongoDB Connection Failed
```bash
# Check MongoDB service on Windows
net start MongoDB

# Or verify MongoDB URI is correct
echo %MONGODB_URI%
```

#### 3. Port Already in Use
```bash
# Windows: Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac: Use lsof
lsof -i :5000
kill -9 <PID>
```

#### 4. CORS Errors
- Check FRONTEND_URL in .env matches frontend origin
- Verify both servers are running
- Clear browser cache

#### 5. Form Validation Not Working
- Check browser console for errors
- Verify React Hook Form is installed
- Check form component code

#### 6. Styling Not Applied
- Clear browser cache (Ctrl+Shift+Delete)
- Restart frontend server
- Check CSS file paths are correct

## Command Reference

### Backend Commands
```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

### Frontend Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Learning Resources

- **MongoDB**: [docs.mongodb.com](https://docs.mongodb.com)
- **Express**: [expressjs.com](https://expressjs.com)
- **React**: [react.dev](https://react.dev)
- **Node.js**: [nodejs.org/docs](https://nodejs.org/docs)
- **Mongoose**: [mongoosejs.com](https://mongoosejs.com)
- **Vite**: [vitejs.dev](https://vitejs.dev)

## Next Steps

1. ✅ Complete all setup steps
2. ✅ Test all features
3. ✅ Read API documentation
4. ✅ Explore source code
5. ✅ Make customizations
6. ✅ Deploy to production

## Support

For issues or questions:
1. Check error messages in terminal/console
2. Verify all prerequisites are installed
3. Check API documentation
4. Review troubleshooting section
5. Check source code comments

---

**Congratulations! You now have a fully functional MERN stack application! 🎉**

Next: Read `README.md` for feature overview and `API_DOCUMENTATION.md` for endpoint details.
