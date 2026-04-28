# Architecture & Design Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
│          (http://localhost:5173)                        │
│                                                          │
│    ┌──────────────────────────────────────────────┐    │
│    │         React Frontend Application            │    │
│    │  ┌─────────────┐  ┌──────────────────────┐   │    │
│    │  │  Components │  │   CSS Styling        │   │    │
│    │  │ ┌─────────┐ │  │ • Responsive Design │   │    │
│    │  │ │FbForm  │ │  │ • HCI Best Practices│   │    │
│    │  │ │FbList  │ │  │ • Accessibility     │   │    │
│    │  │ │Analytics│ │  │                      │   │    │
│    │  │ └─────────┘ │  │                      │   │    │
│    │  └─────────────┘  └──────────────────────┘   │    │
│    │         React Hook Form │ Axios               │    │
│    └──────────────────────────────────────────────┘    │
│                         ▼ HTTP                          │
└─────────────────────────────────────────────────────────┘
                         ▼
                  Network Layer (API)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Express Backend Server                      │
│         (http://localhost:5000)                         │
│                                                          │
│    ┌──────────────────────────────────────────────┐    │
│    │         Express Router & Middleware           │    │
│    │  ┌─────────────┐  ┌───────────────────────┐  │    │
│    │  │ Routes      │  │ Middleware             │  │    │
│    │  │ ┌────────┐  │  │ • Validation          │  │    │
│    │  │ │feedback│  │  │ • Authentication      │  │    │
│    │  │ │auth    │  │  │ • Error Handling      │  │    │
│    │  │ └────────┘  │  │ • CORS                │  │    │
│    │  └─────────────┘  └───────────────────────┘  │    │
│    └──────────────────────────────────────────────┘    │
│                         ▼                              │
│    ┌──────────────────────────────────────────────┐    │
│    │      Controllers (Business Logic)             │    │
│    │  • Feedback operations (CRUD)                │    │
│    │  • Authentication                            │    │
│    │  • Aggregations & Statistics                 │    │
│    └──────────────────────────────────────────────┘    │
│                         ▼                              │
│    ┌──────────────────────────────────────────────┐    │
│    │   Mongoose Models & Validation                │    │
│    │  • FeedbackSchema                            │    │
│    │  • AdminSchema                               │    │
│    │  • Indexes & Validations                     │    │
│    └──────────────────────────────────────────────┘    │
│                         ▼                              │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│              MongoDB Database                           │
│                                                          │
│  Database: feedback-management                          │
│  Collections:                                           │
│  • feedbacks   → Student feedback submissions          │
│  • admins      → Admin user accounts                   │
│                                                          │
│  Features:                                              │
│  • Indexes for fast queries                            │
│  • Schema validation                                    │
│  • Automatic timestamps                                │
└─────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components

```
App.jsx (Root)
├── Navbar
│   └── Navigation & Auth buttons
├── Main Content
│   ├── Student View
│   │   ├── FeedbackForm.jsx
│   │   │   ├── Input Fields
│   │   │   ├── Form Validation (React Hook Form)
│   │   │   └── Submission Logic
│   │   └── FeedbackList.jsx
│   │       ├── Feedback Display (Cards)
│   │       ├── Subject Filter
│   │       ├── Search Functionality
│   │       └── Pagination
│   │
│   └── Admin View
│       ├── AdminLogin.jsx
│       │   └── Login Form
│       └── Dashboard
│           ├── Analytics.jsx
│           │   ├── Overview Cards
│           │   └── Subject Statistics
│           └── FeedbackList.jsx (Protected)
│               └── Management Features
│
└── Footer
    └── Copyright & Info
```

### Backend Structure

```
Backend (Express)
├── Routes
│   ├── /api/feedback (Public & Protected)
│   │   ├── POST /      → createFeedback (Public)
│   │   ├── GET /       → getAllFeedbacks (Protected)
│   │   ├── GET /:id    → deleteFeedback (Protected)
│   │   └── PUT /:id    → updateFeedback (Protected)
│   │
│   ├── /api/feedback/:subject
│   │   └── GET /       → getFeedbacksBySubject (Protected)
│   │
│   ├── /api/feedback/stats/all
│   │   └── GET /       → getFeedbackStats (Protected)
│   │
│   └── /api/auth
│       ├── POST /login   → loginAdmin
│       └── POST /verify  → verifyToken
│
├── Controllers
│   ├── feedbackController.js
│   │   ├── createFeedback()
│   │   ├── getAllFeedbacks()
│   │   ├── getFeedbacksBySubject()
│   │   ├── getFeedbackStats()
│   │   ├── updateFeedback()
│   │   └── deleteFeedback()
│   │
│   └── authController.js
│       ├── loginAdmin()
│       └── verifyToken()
│
├── Middleware
│   ├── validation.js
│   │   ├── validateFeedback
│   │   └── handleValidationErrors
│   │
│   └── auth.js
│       ├── protect()      → Token verification
│       └── authorize()    → Role-based access
│
├── Models
│   ├── Feedback.js
│   │   ├── studentName: String
│   │   ├── email: String (validated)
│   │   ├── subject: Enum
│   │   ├── rating: Number (1-5)
│   │   ├── comments: String (max 500)
│   │   └── timestamps
│   │
│   └── Admin.js
│       ├── username: String
│       ├── password: String (hashed)
│       ├── email: String
│       ├── role: String
│       └── methods: getToken(), matchPassword()
│
└── Config
    └── database.js → MongoDB connection
```

## Data Flow Diagrams

### Student Feedback Submission Flow

```
┌─────────────────────────────────────────────────────────┐
│ 1. Student enters form data in FeedbackForm component   │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 2. React Hook Form validates data (client-side)         │
│    • Name length & pattern                             │
│    • Email format                                       │
│    • Rating range                                       │
│    • Comments length                                    │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 3. If valid, Axios sends POST request to backend        │
│    POST /api/feedback with JSON payload                │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Backend receives request in feedbackController       │
│    • Checks request body exists                        │
│    • Validates using express-validator                │
│    • Validates against Mongoose schema                 │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 5. If valid, create Feedback document in MongoDB       │
│    • Mongoose saves document                           │
│    • Automatic timestamps added                        │
│    • Indexes updated                                   │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 6. Backend sends success response with document data    │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 7. Frontend receives response                           │
│    • Displays success message                          │
│    • Resets form fields                                │
│    • Updates feedback list                             │
└─────────────────────────────────────────────────────────┘
```

### Admin Login & View Feedback Flow

```
┌─────────────────────────────────────────────────────────┐
│ 1. Admin clicks "Admin Mode" button                     │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 2. AdminLogin component renders                         │
│    • Shows login form                                   │
│    • Username & password fields                        │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Admin enters credentials and clicks login            │
│    • Username: admin                                    │
│    • Password: admin123                                 │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 4. POST request sent to /api/auth/login                 │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Backend authController verifies credentials          │
│    • Checks username matches                           │
│    • Checks password matches                           │
│    • Generates JWT token                               │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 6. Response includes JWT token                          │
│    • Token stored in localStorage                      │
│    • User info stored                                  │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 7. Dashboard loads                                      │
│    • Shows Analytics tab                               │
│    • Shows Feedback tab                                │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 8. Analytics component requests stats                   │
│    • GET /api/feedbacks/stats/all                      │
│    • Sends JWT token in Authorization header           │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 9. Backend middleware checks token                      │
│    • protect() middleware verifies JWT                 │
│    • Proceeds if valid                                 │
│    • Returns 401 if invalid                            │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 10. Controller aggregates statistics                    │
│     • Groups by subject                                 │
│     • Calculates averages                               │
│     • Counts total documents                            │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 11. Analytics displayed with charts & cards             │
│     • Overall rating shown                              │
│     • Subject breakdown visible                         │
└─────────────────────────────────────────────────────────┘
```

## Design Decisions

### 1. Frontend Framework: React + Vite
**Why?**
- Fast development with hot module replacement
- Optimal for modern SPAs
- Great developer experience
- Small bundle size

### 2. Form Validation: React Hook Form
**Why?**
- Minimal re-renders
- Excellent UX with instant feedback
- Easy integration with custom validation
- Small library size

### 3. HTTP Client: Axios
**Why?**
- Simpler than fetch for interceptors
- Built-in request/response transformation
- Automatic JSON encoding
- Better error handling

### 4. Backend: Express.js
**Why?**
- Minimal, unopinionated framework
- Great ecosystem
- Excellent for REST APIs
- Easy middleware integration

### 5. Database: MongoDB + Mongoose
**Why?**
- Flexible schema for rapid development
- Document-based, natural for JSON APIs
- Schema validation at application level
- Easy aggregation for statistics

### 6. Authentication: JWT
**Why?**
- Stateless, scalable authentication
- Good for SPA + API architecture
- Token can be stored in localStorage
- Easy to verify on protected routes

## Security Architecture

```
Request Flow with Security:

1. Client Request
   ↓
2. CORS Middleware (Validate Origin)
   ↓
3. Body Parser Middleware (Parse JSON)
   ↓
4. Route Handler
   ↓
5. Validation Middleware (Input Validation)
   ↓
6. Authentication Middleware (If Protected)
   │  ├─ Extract token from header
   │  ├─ Verify JWT signature
   │  └─ Check token expiration
   ↓
7. Authorization Middleware (If Role-based)
   │  └─ Check user role/permissions
   ↓
8. Controller (Business Logic)
   │  └─ Database operations
   ↓
9. Response Middleware
   │  └─ Format response
   ↓
10. Client Response
```

## Performance Considerations

### Database Optimization
- **Indexes**: Created on frequently queried fields
  - `subject` & `createdAt` for feedback filtering
  - `studentName` for search
- **Pagination**: Prevents loading all data at once
- **Aggregation Pipeline**: Efficient statistics calculation

### Frontend Optimization
- **React.memo**: Can be added for expensive components
- **Lazy Loading**: Code splitting for routes (future)
- **CSS-in-JS**: Minimal for better performance
- **Image Optimization**: Not needed currently

### Network Optimization
- **Compression**: Enabled via middleware
- **Caching**: Can add browser caching headers
- **Pagination**: Reduces data transfer

## Scalability Considerations

### Current Limitations
1. Single Node.js process
2. Mocked authentication
3. No caching layer (Redis)
4. Synchronous password hashing

### Future Improvements
1. Load balancing (pm2, Nginx)
2. Real authentication with sessions
3. Redis for caching
4. Async operations where applicable
5. GraphQL for efficient data fetching
6. WebSockets for real-time updates

## Testing Strategy

### Manual Testing Done
- Form submission & validation
- Feedback filtering & search
- Pagination
- Admin login
- Statistics calculation

### Automated Testing (Future)
```javascript
// Backend Tests (Jest)
- Controller tests
- Middleware tests
- Model validation tests

// Frontend Tests (Vitest/React Testing Library)
- Component rendering
- User interactions
- Form validation
- API mocking
```

---

**Last Updated:** January 2024
