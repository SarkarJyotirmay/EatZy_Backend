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
| ------------ | ---------------- |
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

### 🔑 Change Password

## 🔐 POST `/user/change-password`

Allows the user to change their password by providing the **old password** and a **new password**.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/user/change-password`

---

### 📥 Request Headers

| Key           | Value            |
| ------------- | ---------------- |
| Content-Type  | application/json |
| Authorization | Bearer `<JWT>`   |

---

### 📦 Request Payload (Example)

```json
{
  "email": "john.doe@example.com",
  "oldPassword": "OldPass123",
  "newPassword": "NewSecurePassword456"
}
```

## RESPONSES =>

### If Successful

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### If passowrd not matched

```json
{
  "success": false,
  "message": "Old password is incorrect"
}
```

### If error occurs at backend

```json
{
  "success": false,
  "message": "Failed to change password",
  "from": "change password api",
  "error": {}
}
```

## Example Use case

```js
curl -X POST https://zomato-clone-backend-al0h.onrender.com/api/v1/user/change-password \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT_TOKEN>" \
-d {
  "email": "john.doe@example.com",
  "oldPassword": "OldPass123",
  "newPassword": "NewSecurePassword456"
}
```

### 👤 Update User Profile

## 📝 POST `/user/update-profile`

Updates the extended `userProfile` for a user, including nickname, description, preferences, date of birth, and gender.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/user/update-profile`

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
  "nickname": "Johnny",
  "description": "Avid foodie",
  "preferences": ["Italian", "Thai"],
  "dob": "1995-08-20",
  "gender": "male"
}
```

## RESPONSES =>

### If Successful

```json
{
  "success": true,
  "message": "User profile updated",
  "userProfile": {
    "email": "john.doe@example.com",
    "nickname": "Johnny",
    "description": "Avid foodie",
    "preferences": ["Italian", "Thai"],
    "dob": "1995-08-20T00:00:00.000Z",
    "gender": "male"
  }
}
```

### If user not found

```json
{
  "success": false,
  "message": "User not found"
}
```

### If Error occurs at backend

```json
{
  "success": false,
  "message": "Failed to add userProfile to user data"
}
```

## Example Use case

```js
curl -X POST https://zomato-clone-backend-al0h.onrender.com/api/v1/user/update-profile \
-H "Content-Type: application/json" \
-d {
  "email": "john.doe@example.com",
  "nickname": "Johnny",
  "description": "Avid foodie",
  "preferences": ["Italian", "Thai"],
  "dob": "1995-08-20",
  "gender": "male"
}
```

### 👁️ Get User Profile

## 📄 GET `/user/user-profile`

Fetches the `userProfile` data (nickname, preferences, etc.) for a given user using their email.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/user/user-profile`

---

### 📥 Request Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

---

### 🧾 Query Parameter

| Key   | Type   | Required | Description             |
| ----- | ------ | -------- | ----------------------- |
| email | String | ✅ Yes   | User's registered email |

**Example:**  
`/user/user-profile?email=john.doe@example.com`

---

## ✅ RESPONSES

### 🔸 If successful

```json
{
  "success": true,
  "userProfile": {
    "nickname": "Johnny",
    "description": "Avid foodie",
    "preferences": ["Italian", "Thai"],
    "dob": "1995-08-20T00:00:00.000Z",
    "gender": "male"
  }
}
```

### If email not provided

```json
{
  "success": false,
  "message": "Email is required"
}
```

### If user is not found

```json
{
  "success": false,
  "message": "User profile not found"
}
```

### If Error occurs at backend

```json
{
  "success": false,
  "message": "Server error"
}
```

## Example use case

```js
curl -X GET "https://zomato-clone-backend-al0h.onrender.com/api/v1/user/user-profile?email=john.doe@example.com" \
-H "Content-Type: application/json"
```

## 🧭 Stateless Auth Check (Bypass Login), using token

## 🔐 GET `/auth`

Returns the authenticated user’s data by verifying the JWT token.  
This route is useful for checking if a user is already logged in (e.g., on app reload).

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/auth/stateless-login`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |

---

### 📦 Request Payload

> 🔸 No request body is needed — only a valid token is required in headers.

---

## ✅ RESPONSES

### 🔸 If token is valid

```json
{
  "success": true,
  "message": "Bypassed login via state",
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
  }
}
```

### 🔸If token is missing or invalid

```json
{
  "success": false,
  "message": "Invalid or missing token"
}
```

## Example use case

```json
curl -X GET https://zomato-clone-backend-al0h.onrender.com/api/v1/auth/stateless-login
-H "Authorization: Bearer <YOUR_VALID_JWT_TOKEN>"
```

## 🍽️ Restaurant Module

> 📌 **Base URL:** `https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant`  
> 🔐 **Note:** All routes require a valid JWT token in the `Authorization` header.

| HTTP Method | Endpoint      | Action Description                                            | Payload (Body/FormData) |
| ----------- | ------------- | ------------------------------------------------------------- | ----------------------- |
| POST        | `/create`     | Create a restaurant (includes image upload)                   | ✅ Yes (FormData)       |
| GET         | `/`           | Get the restaurant created by the logged-in user              | ❌                      |
| PUT         | `/update`     | Update logged-in user's restaurant (optional image update)    | ✅ Yes (FormData)       |
| GET         | `/list/:city` | List restaurants by city with optional filters/sorting/paging | ❌ (uses query params)  |
| GET         | `/by-id/:id`  | Get a restaurant by its ID                                    | ❌                      |

### 🍽️ Create Restaurant

## 🏗️ POST `/restaurant/create`

Creates a new restaurant for the logged-in user.  
Only one restaurant per user is allowed. An image is required for creation.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant/create`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Content-Type  | multipart/form-data  |
| Authorization | Bearer `<JWT_TOKEN>` |

---

### 📦 Request Payload (FormData)

| Field          | Type   | Required | Description                      |
| -------------- | ------ | -------- | -------------------------------- |
| restaurantName | String | ✅ Yes   | Name of the restaurant           |
| city           | String | ✅ Yes   | City location                    |
| state          | String | ✅ Yes   | State location                   |
| deliveryPrice  | Number | ✅ Yes   | Delivery charge                  |
| deliveryTime   | Number | ✅ Yes   | Estimated delivery time (in min) |
| cuisines       | Array  | ✅ Yes   | e.g. `["Indian", "Italian"]`     |
| menuItems      | Array  | ✅ Yes   | Optional at this stage           |
| imageFile      | File   | ✅ Yes   | Restaurant cover image           |

---

## ✅ RESPONSES

### 🔸 If successful

```json
{
  "success": true,
  "restaurant": {
    "_id": "64ff6c1e2c8f4f001c23e9a9",
    "restaurantName": "Spice Haven",
    "city": "Kolkata",
    "state": "West Bengal",
    "deliveryPrice": 40,
    "deliveryTime": 30,
    "imageUrl": "https://res.cloudinary.com/.../image.jpg",
    "userId": "64ff6c1e2c8f4f001c23e9a1",
    ...
  }
}
```

### If user already has an restaurant

```json
{
  "success": false,
  "message": "User already have an restaurant"
}
```

### If image is missing

```json
{
  "success": false,
  "message": "Image file is missing"
}
```

### If error occurs

```json
{
  "success": false,
  "message": "Could not create restaurant, something went wrong"
}
```

## Example use cases

```js
curl -X POST https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant/create \
-H "Authorization: Bearer <JWT_TOKEN>" \
-F "restaurantName=Spice Haven" \
-F "city=Kolkata" \
-F "state=West Bengal" \
-F "deliveryPrice=40" \
-F "deliveryTime=30" \
-F "cuisines[]=Indian" \
-F "cuisines[]=Chinese" \
-F "imageFile=@/path/to/image.jpg"
```

### 🔍 Get Your Restaurant

## 📄 GET `/restaurant`

Fetches the restaurant created by the **currently logged-in user** (based on their JWT token).

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |

---

### 📦 Request Payload

> ❌ No request body required.

---

## ✅ RESPONSES

### 🔸 If restaurant exists

```json
{
  "success": true,
  "restaurant": {
    "_id": "64ff6c1e2c8f4f001c23e9a9",
    "restaurantName": "Spice Haven",
    "city": "Kolkata",
    "state": "West Bengal",
    "deliveryPrice": 40,
    "deliveryTime": 30,
    "imageUrl": "https://res.cloudinary.com/.../image.jpg",
    "userId": "64ff6c1e2c8f4f001c23e9a1",
    ...
  }
}
```

### If user has not created an restaurant

```json
{
  "success": false,
  "message": "Restaurant not found"
}
```

### If error occurs at backend

```json
{
  "success": false,
  "message": "Can't get restaurant from DB"
}
```

## Example Use case

```js
curl -X GET https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant \
-H "Authorization: Bearer <JWT_TOKEN>"

```

### 🏪 Get Logged-in User's Restaurant

## 📄 GET `/restaurant`

Retrieves the restaurant created by the currently authenticated user (using their token).

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |

---

### 📦 Request Payload

> ❌ No request body required.

---

## ✅ RESPONSES

### 🔸 If restaurant exists

```json
{
  "success": true,
  "restaurant": {
    "_id": "64ff6c1e2c8f4f001c23e9a9",
    "restaurantName": "Spice Haven",
    "city": "Kolkata",
    "state": "West Bengal",
    "deliveryPrice": 40,
    "deliveryTime": 30,
    "imageUrl": "https://res.cloudinary.com/.../image.jpg",
    "userId": "64ff6c1e2c8f4f001c23e9a1",
    ...
  }
}
```

### If restaurant not found

```json
{
  "success": false,
  "message": "Restaurant not found"
}
```

### If error occurs at backend

```json
{
  "success": false,
  "message": "Can't get restaurant from DB"
}
```

## Example use case

```js
curl -X GET https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant
-H "Authorization: Bearer <JWT_TOKEN>"
```

### ✏️ Update Restaurant

## 🔧 PUT `/restaurant/update`

Updates the restaurant created by the currently logged-in user.  
Supports updating fields like name, city, delivery info, cuisines, menu items, and optionally a new image.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant/update`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Content-Type  | multipart/form-data  |
| Authorization | Bearer `<JWT_TOKEN>` |

---

### 📦 Request Payload (FormData)

| Field          | Type   | Required    | Description                      |
| -------------- | ------ | ----------- | -------------------------------- |
| restaurantName | String | ✅ Yes      | Updated restaurant name          |
| city           | String | ✅ Yes      | Updated city                     |
| state          | String | ✅ Yes      | Updated state                    |
| deliveryPrice  | Number | ✅ Yes      | Updated delivery price           |
| deliveryTime   | Number | ✅ Yes      | Updated delivery time in minutes |
| cuisines       | Array  | ✅ Yes      | Updated cuisines list            |
| menuItems      | Array  | ✅ Yes      | Updated menu items               |
| imageFile      | File   | ❌ Optional | New image (if updating image)    |

---

## ✅ RESPONSES

### 🔸 If update is successful

```json
{
  "success": true,
  "restaurant": {
    "_id": "64ff6c1e2c8f4f001c23e9a9",
    "restaurantName": "Updated Haven",
    "city": "Mumbai",
    "state": "Maharashtra",
    "deliveryPrice": 50,
    "deliveryTime": 25,
    "imageUrl": "https://res.cloudinary.com/.../new-image.jpg",
    "cuisines": ["Indian", "South Indian"],
    "menuItems": [...],
    "userId": "64ff6c1e2c8f4f001c23e9a1"
  }
}
```

### If restaurant not found

```json
{
  "success": false,
  "message": "Restaurant not found"
}
```

### If error occurs at backend

```json
{
  "success": false,
  "message": "Unable update restairant"
}
```

### Example use case

```js
curl -X PUT https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant/update
-H "Authorization: Bearer <JWT_TOKEN>" \
-F "restaurantName=Updated Haven" \
-F "city=Mumbai" \
-F "state=Maharashtra" \
-F "deliveryPrice=50" \
-F "deliveryTime=25" \
-F "cuisines[]=Indian" \
-F "cuisines[]=South Indian" \
-F "menuItems[]=\"Paneer Tikka\"" \
-F "imageFile=@/path/to/new-image.jpg"
```

### 🌆 Get Restaurant List by City (with Filters)

## 🧭 GET `/restaurant/list/:city`

Returns a list of restaurants based on the city, with optional filters like search, cuisines, sorting, and pagination.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant/list/:city`

** Example with search query **
`https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant/list/Kolkata?searchQuery=pizza&selectedCuisines=Italian,Fast%20Food&page=2&sortOption=updatedAt`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |

---

### 📦 Request Params

| Param | Type   | Required | Description                |
| ----- | ------ | -------- | -------------------------- |
| city  | String | ✅ Yes   | Name of the city to filter |

---

### 🔍 Optional Query Parameters

| Query Param        | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `searchQuery`      | String | Keyword to match restaurant name or cuisines           |
| `selectedCuisines` | String | Comma-separated list of cuisines (e.g. `Indian,Pizza`) |
| `sortOption`       | String | Field to sort by (e.g. `updatedAt`, `deliveryTime`)    |
| `page`             | Number | Pagination page number (default: 1)                    |

---

## ✅ RESPONSES

### 🔸 If matching restaurants found

```json
{
  "success": true,
  "data": [
    {
      "_id": "64ff6c1e2c8f4f001c23e9a9",
      "restaurantName": "Pizza Palace",
      "city": "Kolkata",
      "cuisines": ["Italian", "Fast Food"],
      ...
    }
  ],
  "pagination": {
    "total": 14,
    "page": 2,
    "pages": 2
  }
}
```

### If no matching restaurant found

```json
{
  "success": false,
  "message": "no search matches for restaurant",
  "data": [],
  "pagination": {
    "total": 0,
    "page": 1,
    "pages": 1
  }
}
```

### If error occurs at backend

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

### Example use case

```js
curl -X GET "https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant/list/Kolkata?searchQuery=pizza&selectedCuisines=Italian,Fast%20Food&page=2" \
-H "Authorization: Bearer <JWT_TOKEN>"
```

### 🆔 Get Restaurant by ID

## 🔍 GET `/restaurant/by-id/:id`

Fetches a single restaurant using its MongoDB Object ID.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant/by-id/:id`

** Example URL \***
`https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant/by-id/64ff6c1e2c8f4f001c23e9a9`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |

---

### 📦 Request Params

| Param | Type   | Required | Description           |
| ----- | ------ | -------- | --------------------- |
| `id`  | String | ✅ Yes   | MongoDB Restaurant ID |

---

### 📦 Request Body

> ❌ No request body required.

---

## ✅ RESPONSES

### 🔸 If restaurant found

```json
{
  "success": true,
  "restaurant": {
    "_id": "64ff6c1e2c8f4f001c23e9a9",
    "restaurantName": "Burger Boss",
    "city": "Delhi",
    "state": "Delhi",
    "imageUrl": "https://res.cloudinary.com/.../image.jpg",
    ...
  }
}
```

### If restaurant not found

```json
{
  "success": false,
  "message": "restaurant not found"
}
```

### If error occurs at backend

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

## Example use case

```js
curl -X GET https://zomato-clone-backend-al0h.onrender.com/api/v1/restaurant/by-id/64ff6c1e2c8f4f001c23e9a9 \
-H "Authorization: Bearer <JWT_TOKEN>"
```

## 🛒 Cart Routes

All routes under `/api/v1/cart` require **JWT authentication**.

### Base URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/cart`

| Method | Endpoint  | Action                               | Payload Required |
| ------ | --------- | ------------------------------------ | ---------------- |
| GET    | `/`       | Get the current user's cart          | ❌               |
| POST   | `/add`    | Add an item to the cart              | ✅               |
| DELETE | `/remove` | Remove a specific item from the cart | ✅               |
| PATCH  | `/update` | Update quantity of a cart item       | ✅               |
| DELETE | `/clear`  | Clear all items in the cart          | ❌               |

### 🛒 Get User's Cart

## 📄 GET `/cart`

Fetches the current logged-in user's cart.  
If no cart exists yet, returns an empty cart structure instead of an error.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/cart`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |

---

### 📦 Request Payload

> ❌ No request body required.

---

## ✅ RESPONSES =>

### 🔸 If cart exists for the user

```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "userId": "user_id",
    "restaurantId": "restaurant_id",
    "restaurantName": "Spicy Kitchen",
    "items": [
      {
        "menuItemId": "menu_item_id",
        "name": "Paneer Tikka",
        "price": 180,
        "quantity": 2,
        "imageUrl": "https://..."
      }
    ]
  }
}
```

### If cart not found

```json
{
  "success": true,
  "data": {
    "userId": "64ff6c1e2c8f4f001c23e9a1",
    "restaurantId": null,
    "restaurantName": null,
    "items": []
  }
}
```

### If backend error occurs

```json
{
  "success": false,
  "message": "Server error"
}
```

## Example Use case

```js
curl -X GET https://zomato-clone-backend-al0h.onrender.com/api/v1/cart
-H "Authorization: Bearer <JWT_TOKEN>"
```

### ➕ Add Item to Cart

## 🛒 POST `/cart/add`

Adds a specific menu item from a restaurant to the authenticated user's cart.  
If a cart already exists, it updates it accordingly. If switching restaurants, the cart is reset.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/cart/add`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |
| Content-Type  | application/json     |

---

### 📦 Request Payload

```json
{
  "restaurantId": "64ff6c1e2c8f4f001c23e9a9",
  "menuItemId": "64ff6c7a2c8f4f001c23e9ad"
}
```

## RESPONSES =>

### If item successfully added

```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "userId": "user_id",
    "restaurantId": "64ff6c1e2c8f4f001c23e9a9",
    "restaurantName": "Spicy Kitchen",
    "items": [
      {
        "menuItemId": "64ff6c7a2c8f4f001c23e9ad",
        "name": "Paneer Tikka",
        "price": 180,
        "quantity": 2
      }
    ]
  }
}
```

### 🔸 If restaurant not found

```json
{
  "success": false,
  "message": "Restaurant not found"
}
```

### 🔸 If menu item not found

```json
{
  "success": false,
  "message": "Menu item not found"
}
```

### 🔸 If backend/server error

```json
{
  "success": false,
  "message": "Server error"
}
```

## Example use cases

```js
curl -X POST https://zomato-clone-backend-al0h.onrender.com/api/v1/cart/add
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d {
  "restaurantId": "64ff6c1e2c8f4f001c23e9a9",
  "menuItemId": "64ff6c7a2c8f4f001c23e9ad"
}
```

### ❌ Remove Item from Cart

## 🗑️ DELETE `/cart/remove`

Removes a specific item from the authenticated user's cart based on the menu item ID.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/cart/remove`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |
| Content-Type  | application/json     |

---

### 📦 Request Payload

```json
{
  "menuItemId": "64ff6c7a2c8f4f001c23e9ad"
}
```

## ✅ RESPONSES =>

### 🔸 If item is successfully removed

```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "userId": "user_id",
    "restaurantId": "64ff6c1e2c8f4f001c23e9a9",
    "restaurantName": "Spicy Kitchen",
    "items": []
  }
}
```

### 🔸 If cart not found for user

```json
{
  "success": false,
  "message": "Cart not found"
}
```

### 🔸 If backend/server error

```json
{
  "success": false,
  "message": "Server error"
}
```

## Example use cases

```js
curl -X DELETE https://zomato-clone-backend-al0h.onrender.com/api/v1/cart/remove
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d {
  "menuItemId": "64ff6c7a2c8f4f001c23e9ad"
}
```

### 🔄 Update Item Quantity in Cart

## 📝 PATCH `/cart/update`

Updates the quantity of a specific menu item in the authenticated user's cart.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/cart/update`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |
| Content-Type  | application/json     |

---

### 📦 Request Payload

```json
{
  "menuItemId": "64ff6c7a2c8f4f001c23e9ad",
  "quantity": 3
}
```

## ✅ RESPONSES =>

### 🔸 If quantity is successfully updated

```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "userId": "user_id",
    "restaurantId": "64ff6c1e2c8f4f001c23e9a9",
    "restaurantName": "Spicy Kitchen",
    "items": [
      {
        "menuItemId": "64ff6c7a2c8f4f001c23e9ad",
        "name": "Paneer Tikka",
        "price": 180,
        "quantity": 3
      }
    ]
  }
}
```

### 🔸 If cart not found

```json
{
  "success": false,
  "message": "Cart not found"
}
```

### 🔸 If item is not in the cart

```json
{
  "success": false,
  "message": "Item not in cart"
}
```

### 🔸 If backend/server error

```json
{
  "success": false,
  "message": "Server error"
}
```

## Example use cases

```js
curl -X PATCH https://zomato-clone-backend-al0h.onrender.com/api/v1/cart/update
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d {
  "menuItemId": "64ff6c7a2c8f4f001c23e9ad",
  "quantity": 3
}
```

### 🧹 Clear Entire Cart

## 🗑️ DELETE `/cart/clear`

Clears all items from the authenticated user's cart.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/cart/clear`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |
| Content-Type  | application/json     |

---

### 📦 Request Payload

_No request body required._

---

## ✅ RESPONSES

### 🔸 If cart is successfully cleared

```json
{
  "success": true,
  "data": {
    "_id": "cart_id",
    "userId": "user_id",
    "restaurantId": "64ff6c1e2c8f4f001c23e9a9",
    "restaurantName": "Spicy Kitchen",
    "items": []
  }
}
```

### 🔸 If cart not found

```json
{
  "success": false,
  "message": "Cart not found"
}
```

### 🔸 If backend/server error

```json
{
  "success": false,
  "message": "Server error"
}
```

## Example use cases

```js
curl -X DELETE https://zomato-clone-backend-al0h.onrender.com/api/v1/cart/clear
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json"
```

## 📦 Order Module Endpoints

All routes under `/api/v1/order` require **JWT authentication**.

### Base URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/order`

| HTTP Method | Endpoint         | Description                      | Payload Required |
| ----------- | ---------------- | -------------------------------- | ---------------- |
| POST        | /order/place     | Place a new order from cart      | ✅               |
| GET         | /order/my-orders | Get all orders of logged-in user | ❌               |

### 🛒 Place an Order

## 📝 POST `/order/place`

Places a new order using the items in the authenticated user's cart.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/order/place`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |
| Content-Type  | application/json     |

---

### 📦 Request Payload

> The endpoint uses the user's saved address by default. However, a custom address can be sent in the payload as follows:

```json
{
  "address": {
    "addressLine1": "123 Main St",
    "addressLine2": "Apt 4B",
    "landmark": "Near Metro Station",
    "city": "Kolkata",
    "state": "West Bengal",
    "pincode": "700001"
  }
}
```

## ✅ RESPONSES =>

### 🔸 If order is successfully placed

```json
{
  "success": true,
  "data": {
    "_id": "order_id",
    "userId": "user_id",
    "restaurantId": "64ff6c1e2c8f4f001c23e9a9",
    "restaurantName": "Spicy Kitchen",
    "items": [
      {
        "menuItemId": "64ff6c7a2c8f4f001c23e9ad",
        "name": "Paneer Tikka",
        "price": 180,
        "quantity": 2
      }
    ],
    "deliveryPrice": 40,
    "totalAmount": 400,
    "address": {
      "addressLine1": "123 Main St",
      "addressLine2": "Apt 4B",
      "landmark": "Near Metro Station",
      "city": "Kolkata",
      "state": "West Bengal",
      "pincode": "700001"
    },
    "createdAt": "2025-07-04T10:12:00.123Z"
  }
}
```

### 🔸 If cart is empty

```json
{
  "success": false,
  "message": "Cart is empty"
}
```

### 🔸 If restaurant not found

```json
{
  "success": false,
  "message": "Restaurant not found"
}
```

### 🔸 If backend/server error

```json
{
  "success": false,
  "message": "Server error"
}
```

## Example use case

```js
curl -X POST https://zomato-clone-backend-al0h.onrender.com/api/v1/order/place \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d
{
  "address": {
    "addressLine1": "123 Main St",
    "addressLine2": "Apt 4B",
    "landmark": "Near Metro Station",
    "city": "Kolkata",
    "state": "West Bengal",
    "pincode": "700001"
  }
}
```

### 📦 Get My Orders

## 📄 GET `/order/my-orders`

Fetches all orders placed by the authenticated user, sorted by newest first.

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/order/my-orders`

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |
| Content-Type  | application/json     |

---

### 📦 Request Payload

_None required._

---

## ✅ RESPONSES

### 🔸 If orders are successfully fetched

```json
{
  "success": true,
  "data": [
    {
      "_id": "order_id_1",
      "userId": "user_id",
      "restaurantId": "64ff6c1e2c8f4f001c23e9a9",
      "restaurantName": "Spicy Kitchen",
      "items": [
        {
          "menuItemId": "64ff6c7a2c8f4f001c23e9ad",
          "name": "Paneer Tikka",
          "price": 180,
          "quantity": 2
        }
      ],
      "deliveryPrice": 40,
      "totalAmount": 400,
      "address": {
        "addressLine1": "123 Main St",
        "addressLine2": "Apt 4B",
        "landmark": "Near Metro Station",
        "city": "Kolkata",
        "state": "West Bengal",
        "pincode": "700001"
      },
      "createdAt": "2025-07-04T10:12:00.123Z"
    },
    {
      "_id": "order_id_2",
      ...
    }
  ]
}
```

### 🔸 If server error occurs

```json
{
  "success": false,
  "message": "Server error"
}
```

## Example use case

```js
curl -X GET https://zomato-clone-backend-al0h.onrender.com/api/v1/order/my-orders
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json"
```

## 🛒 Payment Module Routes

### 💳 Create Razorpay Payment Order

## 📄 POST `/payment/create`

Creates a new Razorpay payment order for the authenticated user using the total amount (in **paise** – ₹1 = 100).

---

### 🔗 Full URL `https://zomato-clone-backend-al0h.onrender.com/api/v1/payment/create`

### 💳 Payment Module — Routes Table

| Method | Endpoint          | Description                     | Payload Required |
| ------ | ----------------- | ------------------------------- | ---------------- |
| POST   | `/payment/create` | Create a Razorpay payment order | ✅ Yes           |

---

### 📥 Request Headers

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |
| Content-Type  | application/json     |

---

### 📦 Request Payload

```json
{
  "totalAmount": 49900
}
💡 Note: The amount must be in paise.
Example: ₹499.00 should be passed as 49900.
```

## ✅ RESPONSES =>

🔸 On successful Razorpay order creation

```json
{
  "success": true,
  "order": {
    "id": "order_Lu6KuWxyz1234",
    "entity": "order",
    "amount": 49900,
    "currency": "INR",
    "receipt": "receipt_order_1720078621349",
    "status": "created",
    "created_at": 1712345678
  }
}
```

### 🔸 If totalAmount is missing

```json
{
  "success": false,
  "message": "Amount is required"
}
```

### 🔸 If Razorpay throws an internal error

```json
{
  "success": false,
  "message": "Payment order creation failed"
}
```

## Example use cases

```js
curl -X POST https://zomato-clone-backend-al0h.onrender.com/api/v1/payment/create \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d {
  "totalAmount": 49900 // in paisa
}

```
