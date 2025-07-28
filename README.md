📘 Job Board App – Full-Stack Web Application
A complete Job Board Application where users can view jobs, and admins can login to post/edit/delete jobs. The application is built using MERN stack (MySQL + Express + React + Node.js) with authentication and protected routes.

📁 Folder Structure
job-board-app/
├── backend/
│   ├── routes/
│   │   └── jobs.js               # CRUD routes for job posts
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT token verification
│   ├── db.js                     # MySQL DB connection
│   ├── auth.js                   # Auth routes (login/register/logout/me)
│   ├── index.js                  # Backend server setup
│   ├── hashPassword.js           # Utility to hash password manually
│   └── package.json              # Backend dependencies & scripts

├── frontend/
    └── src/
        ├── api.js                # Axios instance with credentials
        ├── components/
        │   ├── AdminDashboard.js
        │   ├── AdminJobs.js
        │   ├── JobForm.js
        │   ├── JobList.js
        │   ├── JobFilters.js
        │   ├── Login.js
        │   ├── Register.js
        │   ├── Navbar.js
        │   └── Spinner.js
        ├── contexts/
        │   └── AuthContext.js     # Auth context (login, logout, get current user)
        ├── App.js
        ├── index.js
        └── styles.css

⚙️ Tech Stack:
Layer	Tech
Frontend	React, Context API, Axios
Backend	Node.js, Express
Database	MySQL (XAMPP)
Auth	JWT, bcrypt
Styling	CSS
Deployment	localhost (can be deployed on Vercel + Render/MySQL Remote)

🔐 Authentication Features:
JWT-based login
Admin role-based routing
Protected routes with AuthContext
Cookies stored via httpOnly cookies

📦 Backend Setup:
cd backend
npm install
npm start

✅ .env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=jobboard
JWT_SECRET=yourSecretHere

✅ Manual Admin Password Hashing
To manually insert a hashed password:
node hashPassword.js yourpassword

Then paste the hash in your MySQL DB like:
INSERT INTO users (username, password, isAdmin) VALUES ('admin', '<paste_hash_here>', 1);

🌐 Frontend Setup
cd frontend
npm install
npm start

🌍 Axios Configuration (api.js):
axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});

📸 Screenshots:
🔐 Login Page	👤 Admin Dashboard
📄 Job Listing	🎯 Filters UI
📁 Save these images under: frontend/public/screenshots/

📚 Key Functionalities:
✅ Admin Features:
Login/logout
View, Add, Edit, Delete jobs
Token stored in httpOnly cookie

✅ User Features:
View jobs
Filter by location/title/type
No login required

✅ Authentication Flow:
POST /api/auth/login: Get JWT token
GET /api/auth/me: Validate token & return user
POST /api/auth/logout: Logout by clearing cookie

🔐 Important Files Explained :
auth.js – Login/Register/Logout APIs
authMiddleware.js – JWT token checker
hashPassword.js – Utility to hash password
AuthContext.js – Auth logic in frontend
AdminDashboard.js – Admin-only job management
JobForm.js – Create/Edit job form
JobList.js – Public job listing UI
JobFilters.js – Search & filter form
Navbar.js – Dynamic navbar based on user
Spinner.js – Loading indicator

🚀 Future Improvements :
Pagination
Email notifications
Admin user management
Resume upload option

✅ Live Demo
🌐 Live Site: https://job-board-gorav.netlify.app
🔗 Backend (Render): https://job-board-api.onrender.com