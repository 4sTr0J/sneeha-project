# Sneha - Support Platform

Sneha is a premium full-stack web application designed to provide emotional and psychological support to patients and caregivers in Sri Lanka. It features a premium desktop-first UI with integrated AI support, wellness resources, and peer communities.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the `backend` root:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *Note: This project uses SQLite (`database.sqlite`) for local development, so no external database setup is required.*

### 2. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎨 Tech Stack
- **Frontend**: React + Vite, Lucide icons, Vanilla CSS (Premium Purple Theme)
- **Backend**: Node.js + Express
- **Database**: SQLite (via Sequelize ORM)
- **Auth**: JWT (JSON Web Tokens)

## 📁 Key Directories
- `frontend/src/pages`: Main application views (Dashboard, Wellness, etc.)
- `frontend/src/assets`: Branding and 3D assets
- `backend/routes`: API endpoints
- `backend/models`: Database schemas

## 🤝 Sharing with the Team
To share this project:
1. **GitHub/GitLab**: The recommended way is to initialize a git repository and push it to a private GitHub repo.
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Sneha Desktop Redesign"
   # Then follow GitHub instructions to push to a remote repo
   ```
2. **Zip File**: You can zip the entire `sneha` folder. **IMPORTANT**: Delete the `node_modules` folders in both `frontend` and `backend` before zipping to keep the file size small. Your team can recreate them using `npm install`.

---
Developed with 💜 for Sneha Community.
