# Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. Submit Feedback (Public)

**Endpoint:** `POST /feedback`

**Description:** Submit new feedback for a subject

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "studentName": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Mathematics",
  "rating": 5,
  "comments": "Excellent teaching methodology"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "studentName": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Mathematics",
    "rating": 5,
    "comments": "Excellent teaching methodology",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Response (Validation Error):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "msg": "Rating must be between 1 and 5",
      "param": "rating"
    }
  ]
}
```

---

### 2. Get All Feedbacks (Admin)

**Endpoint:** `GET /feedbacks`

**Description:** Retrieve all feedbacks with pagination

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:**
```
GET /feedbacks?page=1&limit=5
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "studentName": "John Doe",
      "email": "john.doe@example.com",
      "subject": "Mathematics",
      "rating": 5,
      "comments": "Great!",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalDocuments": 50,
    "limit": 5
  }
}
```

---

### 3. Get Feedbacks by Subject (Admin)

**Endpoint:** `GET /feedbacks/:subject`

**Description:** Retrieve feedbacks for a specific subject with average rating

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `subject`: Subject name (e.g., "Mathematics", "Physics")

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:**
```
GET /feedbacks/Mathematics?page=1&limit=5
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "studentName": "John Doe",
      "subject": "Mathematics",
      "rating": 5,
      "comments": "Great teaching!",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "averageRating": 4.5,
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalDocuments": 15,
    "limit": 5
  }
}
```

---

### 4. Get Feedback Statistics (Admin)

**Endpoint:** `GET /feedbacks/stats/all`

**Description:** Get comprehensive feedback statistics

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": [
      {
        "_id": "Mathematics",
        "averageRating": 4.5,
        "totalFeedbacks": 15,
        "maxRating": 5,
        "minRating": 3
      },
      {
        "_id": "Physics",
        "averageRating": 4.2,
        "totalFeedbacks": 12,
        "maxRating": 5,
        "minRating": 2
      }
    ],
    "totalFeedbacks": 27,
    "overallAverageRating": 4.35
  }
}
```

---

### 5. Update Feedback (Admin)

**Endpoint:** `PUT /feedbacks/:id`

**Description:** Update an existing feedback

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameters:**
- `id`: Feedback ID

**Request Body:**
```json
{
  "studentName": "Jane Doe",
  "subject": "Physics",
  "rating": 4,
  "comments": "Good class"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "studentName": "Jane Doe",
    "subject": "Physics",
    "rating": 4,
    "comments": "Good class",
    "updatedAt": "2024-01-15T11:30:00Z"
  }
}
```

---

### 6. Delete Feedback (Admin)

**Endpoint:** `DELETE /feedbacks/:id`

**Description:** Delete a feedback

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `id`: Feedback ID

**Response:**
```json
{
  "success": true,
  "message": "Feedback deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "studentName": "John Doe",
    "subject": "Mathematics",
    "rating": 5
  }
}
```

---

### 7. Admin Login

**Endpoint:** `POST /auth/login`

**Description:** Authenticate admin user

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

**Response (Failure):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 8. Verify Token

**Endpoint:** `POST /auth/verify`

**Description:** Verify JWT token validity

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Valid):**
```json
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

**Response (Invalid):**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

## Valid Subjects

```
- Mathematics
- Physics
- Chemistry
- Biology
- Computer Science
- History
- English
- Other
```

## Error Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (Validation Error)
- `401`: Unauthorized (Missing/Invalid Token)
- `403`: Forbidden (Insufficient Permissions)
- `404`: Not Found
- `500`: Server Error

## Rate Limiting

Currently not implemented. Can be added using `express-rate-limit` middleware.

## CORS

The API accepts requests from:
- `http://localhost:5173` (Default Frontend)
- Can be configured in `.env` via `FRONTEND_URL`

---

**Last Updated:** January 2024
