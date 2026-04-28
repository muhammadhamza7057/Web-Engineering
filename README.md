# Student Feedback Management System - MERN Stack

A full-stack web application for managing student feedback with professional UI/UX, built using the MERN stack (MongoDB, Express, React, Node.js).

## 🎯 Features

### Core Features
- ✅ **Student Feedback Submission**: Easy-to-use form for students to submit feedback
- ✅ **Real-time Validation**: Client-side and server-side validation with instant feedback
- ✅ **Feedback Management**: View, filter, and manage feedback submissions
- ✅ **Subject-wise Filtering**: Filter feedback by subject with average rating display
- ✅ **Admin Dashboard**: Protected admin interface with authentication
- ✅ **Analytics**: View comprehensive feedback statistics and analytics
- ✅ **Responsive Design**: Fully responsive layout for all devices
- ✅ **Professional UI**: HCI best practices with modern color scheme

### Bonus Features
- 🎁 **Average Rating Per Subject**: Dynamically calculated and displayed
- 🎁 **Form Validation**: Using React Hook Form for real-time feedback
- 🎁 **Pagination**: Efficient handling of large datasets
- 🎁 **Admin Authentication**: Mocked authentication system for demo purposes
- 🎁 **Analytics Dashboard**: Subject-wise feedback breakdown and statistics

## 📋 Project Structure

```
OEL-WEB/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── models/
│   │   │   ├── Feedback.js          # Feedback schema with validation
│   │   │   └── Admin.js             # Admin schema
│   │   ├── controllers/
│   │   │   ├── feedbackController.js # Feedback CRUD operations
│   │   │   └── authController.js    # Authentication logic
│   │   ├── routes/
│   │   │   ├── feedbackRoutes.js    # Feedback endpoints
│   │   │   └── authRoutes.js        # Auth endpoints
│   │   ├── middleware/
│   │   │   ├── validation.js        # Input validation middleware
│   │   │   └── auth.js              # Authentication middleware
│   │   └── server.js                # Express server setup
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FeedbackForm.jsx      # Feedback submission form
    │   │   ├── FeedbackList.jsx      # Feedback display & filtering
    │   │   ├── AdminLogin.jsx        # Admin login interface
    │   │   └── Analytics.jsx         # Dashboard analytics
    │   ├── styles/
    │   │   ├── index.css             # Global styles & CSS variables
    │   │   ├── App.css               # App layout
    │   │   ├── FeedbackForm.css      # Form styling
    │   │   ├── FeedbackList.css      # List styling
    │   │   ├── AdminLogin.css        # Login styling
    │   │   └── Analytics.css         # Analytics styling
    │   ├── App.jsx                   # Main app component
    │   └── main.jsx                  # React entry point
    ├── public/
    │   └── index.html                # HTML template
    ├── package.json
    ├── vite.config.js
    └── README.md
```

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Step 1: Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd OEL-WEB/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file** (copy from .env.example)
   ```bash
   cp .env.example .env
   ```

4. **Configure .env file**
   ```env
   MONGODB_URI=mongodb://localhost:27017/feedback-management
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_change_in_production
   NODE_ENV=development
   ADMIN_PASSWORD=admin123
   ```

5. **Start MongoDB** (if using local)
   ```bash
   # On Windows with MongoDB installed
   net start MongoDB
   
   # Or use MongoDB Atlas (cloud)
   ```

6. **Start backend server**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Step 2: Frontend Setup

1. **Open new terminal and navigate to frontend directory**
   ```bash
   cd OEL-WEB/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The frontend will open at `http://localhost:5173`

## 📖 Usage Guide

### For Students

1. **Submit Feedback**
   - Fill in the feedback form with your details
   - Select subject and rating
   - Add optional comments
   - Click "Submit Feedback"

2. **View Feedbacks**
   - See all submitted feedbacks in the list
   - Filter by subject to see specific feedback
   - Use search to find specific students

### For Admins

1. **Login to Admin Panel**
   - Click "Admin Mode" button
   - Enter credentials:
     - Username: `admin`
     - Password: `admin123`

2. **View Dashboard**
   - See feedback statistics and analytics
   - View average ratings per subject
   - See total feedback count

3. **Manage Feedbacks**
   - View all feedbacks with pagination
   - Filter by subject
   - Delete feedback if needed
   - Search for specific feedback

## 🔧 API Endpoints

### Feedback Endpoints

#### Submit Feedback (Public)
```
POST /api/feedback
Content-Type: application/json

{
  "studentName": "John Doe",
  "email": "john@example.com",
  "subject": "Mathematics",
  "rating": 5,
  "comments": "Great teaching method"
}
```

#### Get All Feedbacks (Admin Only)
```
GET /api/feedbacks?page=1&limit=10
Authorization: Bearer {token}
```

#### Get Feedbacks by Subject (Admin Only)
```
GET /api/feedbacks/:subject?page=1&limit=10
Authorization: Bearer {token}
```

#### Get Statistics (Admin Only)
```
GET /api/feedbacks/stats/all
Authorization: Bearer {token}
```

#### Delete Feedback (Admin Only)
```
DELETE /api/feedbacks/:id
Authorization: Bearer {token}
```

#### Update Feedback (Admin Only)
```
PUT /api/feedbacks/:id
Authorization: Bearer {token}

{
  "studentName": "Updated Name",
  "subject": "Physics",
  "rating": 4,
  "comments": "Updated comments"
}
```

### Authentication Endpoints

#### Admin Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

#### Verify Token
```
POST /api/auth/verify
Authorization: Bearer {token}
```

## 🎨 Design Principles & HCI Best Practices

### Color Scheme
- **Primary**: Indigo (#4F46E5) - Professional, trustworthy
- **Success**: Emerald (#10B981) - Positive feedback
- **Error**: Red (#EF4444) - Attention/warnings
- **Neutral**: Gray scale - Clean, readable text

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable sans-serif font (Segoe UI)
- **Monospace**: For code/technical content

### Spacing & Layout
- **Consistent padding/margins**: Based on CSS variables
- **Grid-based system**: Mobile-first responsive design
- **Flexible layouts**: Adapts to all screen sizes

### User Feedback
- **Loading states**: Spinner animation with message
- **Form validation**: Real-time, instant feedback
- **Success/error messages**: Clear, dismissable alerts
- **Transitions**: Smooth animations for better UX

### Accessibility
- **Focus states**: Clear focus indicators
- **Color contrast**: WCAG AA compliant
- **Semantic HTML**: Proper label associations
- **Keyboard navigation**: Fully accessible via keyboard

## 📱 Responsive Breakpoints

```css
Desktop:      1024px+
Tablet:       768px - 1023px
Mobile:       480px - 767px
Small Mobile: < 480px
```

## 🔐 Security Features

- ✅ Input validation (both client & server)
- ✅ JWT-based authentication
- ✅ Protected API routes
- ✅ CORS enabled
- ✅ Mongoose schema validation
- ✅ Secure password hashing (bcryptjs)

## 🚨 Validation Rules

### Student Name
- Required
- 2-50 characters
- Letters and spaces only

### Email
- Required
- Valid email format

### Subject
- Required
- Must be from predefined list

### Rating
- Required
- Integer between 1-5

### Comments
- Optional
- Maximum 500 characters

## 📊 Database Schema

### Feedback Collection
```javascript
{
  _id: ObjectId,
  studentName: String,
  email: String,
  subject: String (enum),
  rating: Number (1-5),
  comments: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Collection
```javascript
{
  _id: ObjectId,
  username: String,
  password: String (hashed),
  email: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing the Application

### Test Feedback Submission
1. Go to Student Mode
2. Fill all required fields
3. Click "Submit Feedback"
4. See success message
5. View feedback in the list

### Test Admin Features
1. Click "Admin Mode"
2. Login with demo credentials
3. View dashboard analytics
4. Filter feedbacks by subject
5. Test pagination

## 📈 Future Enhancements

- [ ] Email notifications
- [ ] Advanced analytics with charts (Chart.js)
- [ ] Export feedback to PDF/Excel
- [ ] User authentication system
- [ ] Multiple admin roles
- [ ] Real-time notifications with WebSocket
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] File upload (images/documents)
- [ ] Feedback history & version control

## 🐛 Troubleshooting

### Backend won't connect to MongoDB
- Check MongoDB service is running
- Verify MONGODB_URI in .env
- Check MongoDB credentials if using Atlas

### Frontend not communicating with backend
- Ensure both servers are running
- Check CORS settings in backend
- Verify API endpoints in frontend
- Check browser console for errors

### Styling not loading
- Clear browser cache
- Check CSS files exist in styles folder
- Verify CSS imports in components
- Check for console errors

## 📝 Environment Variables

Create `.env` file in backend with:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
```

## 📦 Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ORM
- **cors**: Cross-Origin Resource Sharing
- **express-validator**: Input validation
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **dotenv**: Environment variables

### Frontend
- **react**: UI library
- **react-dom**: React DOM rendering
- **axios**: HTTP client
- **react-hook-form**: Form state management
- **react-router-dom**: Routing (optional for future)
- **vite**: Build tool

## 📄 License

This project is provided for educational purposes.

## 👨‍💻 Author

Developed as a MERN Stack learning project with professional best practices.

---

**Happy Coding! 🚀**

For questions or issues, refer to the component documentation in the source files.
