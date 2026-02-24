# 🎓 Learning Management System (Backend)

A backend-focused Learning Management System built using **Node.js, Express.js, and MongoDB**, designed to manage teachers, students, classes, and subjects with secure role-based access control.

This project focuses on backend architecture, authentication, and structured academic data management.

---

## 🚀 Key Features

* 🔐 Admin Authentication (JWT-based)
* 👨‍🏫 CRUD for Teachers
* 👨‍🎓 CRUD for Students
* 📚 CRUD for Subjects
* 🏫 CRUD for Classes
* 🔗 Assign Teachers to Subjects & Classes
* 📝 Assign Students to Classes
* 🛡️ Role-Based Route Protection
* 🧩 Modular Backend Architecture

---

## 🏗️ System Architecture

The project follows a clean and scalable backend structure:

```plaintext
src/
│── controllers/
│── routes/
│── models/
│── middleware/
│── config/
│── utils/
```

### 🔐 Security Design

* JWT-based authentication
* Protected admin routes
* Middleware-based authorization
* Secure password hashing

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JSON Web Token (JWT)
* **Architecture:** RESTful APIs, Modular Folder Structure

---

## 📌 Core Functional Modules

### Admin

* Register / Login
* Manage Teachers
* Manage Students
* Create Subjects
* Create Classes

### Teacher Management

* Assign teachers to specific subjects
* Assign teachers to classes

### Student Management

* Assign students to classes
* Automatically associate subjects based on class

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/lms-backend.git

# Navigate to project directory
cd lms-backend

# Install dependencies
npm install

# Create .env file
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

# Run development server
npm run dev
```

---

## 🎯 Purpose of the Project

This project was built to demonstrate:

* Backend API development
* Role-based access control
* Academic data modeling
* Structured RESTful architecture
* Real-world admin system design

---

## 📌 Current Scope

This is a backend-only implementation.
No frontend UI is included.

Future improvements may include:

* Role-based dashboards
* Attendance management
* Marks & grading system
* Deployment

---

## 👨‍💻 Author

**Mehul Nawal**
Backend / MERN Stack Developer

---

