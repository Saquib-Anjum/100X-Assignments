# Backend Assignment — Car Rental Booking System

**Tech Stack (Recommended):** Node.js, Express, PostgreSQL, Prisma, Zod, JWT, bcrypt, `ws` (optional for live status)

**Duration:** 3–4 hours

---

## 🎯 Objective

Design and implement a production-style backend for a **Car Rental Booking System** with:

- User authentication (Customer & Admin)
- Role-based access control
- Car inventory management
- Booking lifecycle management
- Payments (mocked)
- Audit logging

---

## ✅ Response Format Standard

### Success Response
```json
{
  "success": true,
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

All HTTP responses MUST follow this format.

---

## 🔐 JWT Authentication

### JWT Payload
```json
{
  "userId": "UUID",
  "role": "customer | admin"
}
```

### Header
```
Authorization: <JWT_TOKEN>
```

---

## 🗄️ Prisma Models (PostgreSQL)

```prisma
model User {
  id       String  @id @default(uuid())
  name     String
  email    String  @unique
  password String
  role     String  // "customer" | "admin"
  bookings Booking[]
}

model Car {
  id          String  @id @default(uuid())
  brand       String
  model       String
  year        Int
  pricePerDay Float
  isAvailable Boolean @default(true)
  bookings    Booking[]
}

model Booking {
  id         String   @id @default(uuid())
  userId     String
  carId      String
  startDate  DateTime
  endDate    DateTime
  totalPrice Float
  status     String   // pending | confirmed | cancelled | completed
  createdAt  DateTime @default(now())

  user User @relation(fields: [userId], references: [id])
  car  Car  @relation(fields: [carId], references: [id])
}
```

---

## 📡 HTTP API Routes

### 1) POST /auth/signup
**Role:** customer or admin

**Body (Zod):**
```ts
{
  name: string;
  email: string;
  password: string (min 6);
  role: "customer" | "admin";
}
```

**Success (201):** returns user (without password).

---

### 2) POST /auth/login
Returns JWT token.

---

### 3) GET /auth/me
Returns current user profile.

---

## 🚗 Car Management (Admin Only)

### 4) POST /cars
Create a car.

Body:
```ts
{
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
}
```

### 5) GET /cars
List all cars (customers + admins).

Query filters (optional):
- ?available=true
- ?brand=Toyota

### 6) GET /cars/:id
Get single car details.

---

## 📅 Booking APIs (Customer)

### 7) POST /bookings
Customer books a car.

Body:
```ts
{
  carId: string;
  startDate: string;
  endDate: string;
}
```

Server actions:
- Validate dates
- Check car availability
- Calculate price = days * pricePerDay
- Create booking with status = "pending"
- Mark car temporarily unavailable

---

### 8) GET /bookings/me
Customer sees their bookings.

### 9) GET /bookings/:id
Customer sees single booking (only their own).

---

## 🔧 Admin Booking Control

### 10) PATCH /bookings/:id/status
Admin updates booking status.

Body:
```ts
{
  status: "confirmed" | "cancelled" | "completed";
}
```

Rules:
- If cancelled → car becomes available again.
- If completed → booking finalized.

---

## 💳 Mock Payment Flow

Endpoint: POST /payments/confirm

Body:
```ts
{
  bookingId: string;
}
```

Server actions:
- Fake payment success
- Change booking status to "confirmed"

---

## 🧾 Audit Logs (Optional Bonus)

Track important actions:
- user signup
- car created
- booking created
- booking status changed

Table suggestion:
```prisma
model AuditLog {
  id        String   @id @default(uuid())
  action    String
  userId    String?
  createdAt DateTime @default(now())
}
```

---

## 🧪 Expectations from Candidate
- Proper folder structure
- Middleware for auth & roles
- Zod validation on all inputs
- Prisma error handling
- Clean, readable code

---

**Good luck! Build smart, not fast. 🚀**

