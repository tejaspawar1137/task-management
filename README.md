# Task Management App

This is a Kanban-style Task Management App built using React.js, Firebase, Zustand, and TailwindCSS.

## 🚀 Live Demo
[Click here to see the live demo](#) *(Replace with your Firebase Hosting URL)*

## 📂 Project Overview
This app allows users to manage tasks with authentication, real-time updates, drag-and-drop functionality, filtering, sorting, and activity logs.

## 🛠️ Tech Stack
- **Frontend:** React.js, TailwindCSS, shadcn/ui
- **State Management:** Context API
- **Backend:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **Deployment:** Firebase Hosting

---

## 📌 Features
✅ Firebase Authentication (Google & Email/Password)
✅ Kanban-style Drag & Drop Board
✅ Task CRUD Operations
✅ Real-time updates with Firestore
✅ Search, Filtering, and Sorting
✅ Activity Logs for Task Updates
✅ Error Handling & Optimized Performance
✅ 80%+ Test Coverage
✅ Deployed on Firebase Hosting

---

## 🔧 Setup Guide

### 1. Clone the Repository
```sh
git clone https://github.com/tejaspawar1137/task-management
cd task-management-app
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Firebase
1. Create a Firebase project in [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Google & Email/Password)
3. Set up Firestore Database
4. Get your Firebase config and add it to `.env`

```sh
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. Run the App
```sh
npm start
```

---

## 🚀 Deployment
1. Install Firebase CLI:
```sh
npm install -g firebase-tools
```
2. Login to Firebase:
```sh
firebase login
```
3. Initialize Firebase:
```sh
firebase init
```
4. Deploy:
```sh
firebase deploy
```

---

## 📖 Folder Structure
```
📂 src
 ├── 📁 components     # UI Components
 ├── 📁 pages          # Pages (Dashboard, Login, etc.)
 ├── 📁 Context          # Context API State Management
 ├── 📁 types          # Managed Types Of Components
 ├── 📁 firebase       # Firebase Config
 ├── 📁 utils          # Utility Functions
 ├── App.tsx          # Main App Component
 ├── main.tsx        # Entry Point
```

---

## 📝 API Details
- **Authentication:** Firebase Auth
- **Database:** Firestore (tasks, activity logs, user data)
- **Real-time Updates:** Firestore Subscriptions

---

## 👨‍💻 Author
Tejas Pawar

If you have any questions, feel free to reach out! 🚀

