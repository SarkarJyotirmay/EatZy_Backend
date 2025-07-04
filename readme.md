# 🍽️ Eatzy - REST API Documentation

Welcome to the **Eatzy Backend API**, built with Node.js, Express, and MongoDB. This RESTful API powers a food delivery platform where users can:

- Register & authenticate
- Browse restaurants and menus
- Create and manage restaurant
- Create and manage user profile
- Manage their cart
- Place orders
- Make secure payments with Razorpay

---

## 📦 Modules Covered

- 🧑 `User` – Register, login (No auth required)
- 🔐 `Auth` – Access user info
- 🍽️ `Restaurant` – Manage restaurants & menu
- 🛒 `Cart` – Add, remove, view cart items
- 📦 `Order` – Checkout & order history
- 💳 `Payment` – Razorpay integration

---

## 📄 API Version

All endpoints are versioned under `/api/v1/`

> 📘 Continue below to explore each module and its endpoints in detail.

---

## 🌐 Base URL => https://zomato-clone-backend-al0h.onrender.com/api/v1

## 🧑 User Module

> Base URL: `https://zomato-clone-backend-al0h.onrender.com/api/v1/user`

| HTTP Method | Endpoint           | Action                         | Payload |
| ----------- | ------------------ | ------------------------------ | ------- |
| POST        | `/register`        | Register a new user            |         |
| POST        | `/login`           | Log in a user and return token |         |
| POST        | `/forgot-password` | Send password reset link       |         |
| POST        | `/reset-password`  | Reset password using token     |         |
| POST        | `/update-profile`  | Update user profile            |         |
| GET         | `/user-profile`    | Get user profile details       |         |

## To Register a user

## 📝 POST `/user/register`

Registers a new user to the platform.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/user/register`

---

### 📥 Request Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

---

### 📦 Request Payload (Full Example)

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "mobNo": "9876543210",
  "password": "SecurePass123",
  "role": "CUSTOMER",
  "address": {
    "addressLine1": "123 Main Street",
    "addressLine2": "Apt 4B",
    "landmark": "Near Park",
    "city": "Kolkata",
    "state": "West Bengal",
    "pincode": "700001"
  },
  "userProfile": {
    "nickname": "Johnny",
    "description": "Food lover",
    "preferences": ["Indian", "Chinese"],
    "dob": "1995-08-20",
    "gender": "male"
  }
}
```

## RESPONSE =>

### If successful

```json
{
  "succes": true,
  "message": "Registration successfull",
  "user": {
    "firstName": "John",
    "email": "john.doe@example.com"
  },
  "from": "register API"
}
```

### If user already have account and tries to register

```json
{
  "success": false,
  "message": "User is already registered"
}
```

### If Error occurs

```json
{
  "success": false,
  "message": "Failed to register user",
  "from": "register API"
}
```

### Example Use Case

```js
curl -X POST https://zomato-clone-backend-al0h.onrender.com/api/v1/user/register \
-H "Content-Type: application/json" \
-d {
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "mobNo": "9876543210",
  "password": "SecurePass123",
  "role": "CUSTOMER",
  "address": {
    "addressLine1": "123 Main Street",
    "addressLine2": "Apt 4B",
    "landmark": "Near Park",
    "city": "Kolkata",
    "state": "West Bengal",
    "pincode": "700001"
  },
  "userProfile": {
    "nickname": "Johnny",
    "description": "Food lover",
    "preferences": ["Indian", "Chinese"],
    "dob": "1995-08-20",
    "gender": "male"
  }
}
```

## 🔐 POST `/user/login`

Authenticates a user and returns a JWT token for future authenticated requests.

---

## To Login / Sign in

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/user/login`

---

### 📥 Request Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

---

### 📦 Request Payload (Example)

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

## RESPONSES

### If successfull

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "64ff6c1e2c8f4f001c23e9a9",
    "firstName": "John",
    "email": "john.doe@example.com",
    "role": "CUSTOMER",
    "address": {
      "addressLine1": "123 Main Street",
      "addressLine2": "Apt 4B",
      "landmark": "Near Park",
      "city": "Kolkata",
      "state": "West Bengal",
      "pincode": "700001"
    }
  },
  "token": "JWT_TOKEN_STRING"
}
```

### If user not registered

```json
{
  "success": false,
  "message": "User not found in DB",
  "from": "login API"
}
```

### If password not matched

```json
{
  "success": false,
  "message": "Wrong password",
  "from": "login API"
}
```

### If Error occurs at backend

```json
{
  "success": false,
  "message": "login API failed",
  "from": "login API",
  "error": {}
}
```

### Example Use Case

```js
curl -X POST https://zomato-clone-backend-al0h.onrender.com/api/v1/user/login \
-H "Content-Type: application/json" \
-d {
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

### Forget password

## 📧 POST `/user/forgot-password`

Generates a 4-digit OTP and sends it in response
Future improvement => send to the user's registered email for password reset.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/user/forgot-password`

---

### 📥 Request Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

---

### 📦 Request Payload (Example)

```json
{
  "email": "john.doe@example.com"
}
```

## RESPONSES =>

### If successful

```json
{
  "succes": true,
  "message": "Password reset OTP sent on registered email",
  "otp": 4821,
  "otpExpiry": "5 minutes"
}
```

### If user not found

```json
{
  "success": false,
  "message": "User not found"
}
```

### If error occurs at backend

```json
{
  "success": false,
  "message": "Failed to forgot password",
  "from": "forgot password api",
  "error": {}
}
```

### Example Use Case

```js
curl -X POST https://zomato-clone-backend-al0h.onrender.com/api/v1/user/forgot-password \
-H "Content-Type: application/json" \
-d {
  "email": "john.doe@example.com"
}
```

### 🔁 Reset Password

## 🔐 POST `/user/reset-password`

Verifies OTP and resets the user's password. OTP is valid for 5 minutes only

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/user/reset-password`


---

### 📥 Request Headers

| Key          | Value            |
|--------------|------------------|
| Content-Type | application/json |

---

### 📦 Request Payload (Example)

```json
{
  "email": "john.doe@example.com",
  "otp": "4821",
  "newPassword": "NewSecurePassword123"
}
```

## RESPONSES =>

### If successful
```json
{
  "succes": true,
  "message": "Successfullt reseted password"
}
```

### If user not found with email and otp
```json
{
  "success": false,
  "message": "User not found"
}
``` 

### If OTP expires
```json
{
  "success": false,
  "message": "OTP is not valid"
}
```

### If error occurs at backend
```json
{
  "success": false,
  "message": "Something went wrong while resetting password"
}
```

## Example Use case 
```js
curl -X POST https://zomato-clone-backend-al0h.onrender.com/api/v1/user/reset-password \
-H "Content-Type: application/json" \
-d {
  "email": "john.doe@example.com",
  "otp": "4821",
  "newPassword": "NewSecurePassword123"
}
```



