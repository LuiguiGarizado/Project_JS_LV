# 🎯 RiwiFlow - Kanban Task Management System

A modern, single-page application (SPA) for managing tasks using a Kanban board with role-based access control. Built with vanilla JavaScript and styled with Tailwind CSS.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [User Roles & Permissions](#user-roles--permissions)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [Team Management](#team-management)

---

## ✨ Features

### Authentication & Authorization
- ✅ User login with email and password
- ✅ Session management with localStorage
- ✅ Role-based access control (Admin, Coder)
- ✅ Secure logout functionality

### Task Management
- ✅ Create tasks (Admin only)
- ✅ Edit tasks with full permission control
- ✅ Delete tasks (Admin only)
- ✅ Drag-and-drop task status updates
- ✅ Assign tasks to team members
- ✅ Task filtering by status (To Do, In Progress, In Review, Done)

### Team Management
- ✅ Create new team members (Admin only)
- ✅ Edit user information and passwords
- ✅ Delete users (Admin only)
- ✅ Manage user roles dynamically

### User Experience
- ✅ Single Page Application (SPA) - no page reloads
- ✅ Responsive design for desktop and tablet
- ✅ Modal dialogs instead of browser alerts
- ✅ Material Design icons
- ✅ Smooth drag-and-drop interactions
- ✅ Real-time data synchronization

---

## 🗂️ Project Structure

```
.
├── index.html                 # Main entry point
├── login.html                 # Login page
├── board.html                 # Legacy board file
├── package.json               # Node dependencies
├── db.json                    # JSON Server database
├── README.md                  # This file
└── src/
    ├── js/
    │   ├── app.js            # Main SPA ( Single page Application) router & notification system
    │   ├── api.js            # API service for backend calls
    │   └── views/
    │       ├── loginView.js   # Login page component
    │       └── dashboardView.js # Main dashboard with tasks & team
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone or download the repository**
```bash
cd your-project-folder
```

2. **Install dependencies**
```bash
npm install
```

3. **Verify json-server is installed**
```bash
npm list json-server
```

If not installed, add it:
```bash
npm install json-server --save-dev
```

---

## ▶️ Running the Application

### Terminal 1: Start JSON Server (Backend)
```bash
npx json-server --watch db.json --port 3000
```

The API will be available at `http://localhost:3000`

### Terminal 2: Open the Application
```bash
# Simply open index.html in your browser
# Or use a local server (e.g., Live Server in VS Code)
```

The application will open at `http://localhost:5500` (or similar)

### Default Login Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@company.com | admin123 | Admin |
| coder@company.com | coder123 | Coder |

---

## 👥 User Roles & Permissions

### Admin Role
- ✅ Create, read, update, and delete tasks
- ✅ Assign tasks to any team member
- ✅ Move all tasks between statuses
- ✅ Access Team management section

### Coder Role
- ✅ View all tasks
- ✅ Edit only assigned tasks
- ✅ Change status of assigned tasks
- ✅ Update description of assigned tasks
- ❌ Create new tasks
- ❌ Edit or delete other users' tasks
- ❌ Access Team management section

---

## 🔌 API Endpoints

All endpoints use `json-server` at `http://localhost:3000`

### Users
```
GET    /users                    # Get all users
GET    /users?email=X&password=Y # Login validation
GET    /users/{id}               # Get single user
POST   /users                    # Create new user
PATCH  /users/{id}               # Update user
DELETE /users/{id}               # Delete user
```

### Tasks
```
GET    /tasks                    # Get all tasks
GET    /tasks/{id}               # Get single task
POST   /tasks                    # Create new task
PATCH  /tasks/{id}               # Update task
DELETE /tasks/{id}               # Delete task
```

---

## 🛠️ Technologies Used

- **Frontend Framework:** Vanilla JavaScript (ES6+)
- **Styling:** Tailwind CSS
- **Icons:** Material Symbols
- **Backend:** json-server (for development)
- **State Management:** LocalStorage for sessions
- **Architecture:** Single Page Application (SPA)

---

## 💾 Database Schema

### Users Table
```json
{
  "id": "unique-id",
  "name": "User Name",
  "email": "user@company.com",
  "password": "password123",
  "role": "admin|coder"
}
```

### Tasks Table
```json
{
  "id": "unique-id",
  "title": "Task Title",
  "description": "Task Description",
  "status": "todo|in progress|in review|done",
  "userId": "assigned-user-id"
}
```

---

## 👨‍💼 Team Management (Admin Only)

### Creating Users
1. Navigate to **Team** section
2. Click **"Add person"** button
3. Fill in the form:
   - Name
   - Email
   - Password
   - Role (Coder or Admin)
4. Click **"Create"**

### Editing Users
1. Navigate to **Team** section
2. Click **"Edit"** button on any user card
3. Modify the information:
   - Change name or email
   - Update password (optional - leave empty to keep current)
   - Change role
4. Click **"Save Changes"**

### Deleting Users
1. Navigate to **Team** section
2. Click **"Delete"** button on any user card
3. Confirm the deletion

---

## 🔄 Task Workflow

### Creating a Task (Admin)
1. Click **"New Task"** button in sidebar
2. Fill in task details:
   - Title
   - Description
   - Assign to a team member
3. Click **"Create"** - defaults to "To Do" status

### Moving Tasks (All Users)
- **Drag and drop** tasks between columns
- Coders can only move their own tasks
- Admins can move any task

### Editing Tasks
1. Click on any task card
2. Edit available fields:
   - **Admin:** Can edit all fields and delete
   - **Coder:** Can only edit description and status of own tasks
3. Click **"Save"**

### Deleting Tasks (Admin Only)
1. Click on any task card
2. Click **"Delete Task"** button
3. Confirm deletion

---

## 🎨 User Interface Features

### Notifications
- **Success messages** displayed in green modals
- **Error messages** displayed in red modals
- **Confirmations** with Cancel and Confirm buttons
- All styled with Material Design principles

### Navigation
- **Dashboard:** Kanban board view with all tasks
- **Team:** Team member management panel
- **Responsive menu:** Collapses on smaller screens

### Security
- Passwords are stored in database (not encrypted in demo)
- Permission checks on every action
- Users cannot delete their own account while logged in

---

## 📝 Notes for Development

- All styling uses Tailwind CSS utility classes
- Drag-and-drop is fully implemented with native HTML5 drag API
- Modals replace browser alerts for better UX
- Session persists in localStorage (demo only - not secure for production)
- Add proper password hashing and encryption for production use


## 📄 License

This project is part of an educational assignment. All rights reserved.

## Author

> Luigui Garizado and Victoria Sutachan
