# Fix My Area (Hyperlocal Civic Platform)

A full-stack hyperlocal civic platform that allows users to report local problems (garbage, road damage, etc.), vote on them to increase priority, and track resolution status.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens.
- **Issue Reporting**: Report problems with titles, descriptions, categories, images, and geolocation.
- **Voting System**: Upvote issues to increase visibility and priority.
- **Priority Sorting**: View "Top Voted" issues to see what the community cares about most.
- **Location Based**: Issues are mapped using Google Maps API.
- **Admin Dashboard**: Specialized interface for authorities to update issue status (Pending -> In Progress -> Resolved).
- **Responsive Design**: Premium look and feel with glassmorphism and dark mode, optimized for all devices.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Framer Motion, Lucide Icons, Axios, React Router.
- **Backend**: Python, FastAPI, SQLAlchemy, PostgreSQL.
- **Authentication**: JWT (JSON Web Tokens).
- **Storage**: Local file storage for images (can be easily swapped for Cloudinary).
- **Maps**: Google Maps API.

## 📦 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL database

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables (create `.env`):
   ```bash
   cp .env.example .env
   # Update DATABASE_URL and SECRET_KEY in .env
   ```
5. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📸 Screenshots

*(Add your screenshots here)*

## 📝 Admin Instructions

- The first user to register on the platform is automatically granted **Admin** privileges for testing purposes.
- Admins can access the `/admin` dashboard to change issue statuses and delete inappropriate reports.

## 📄 License

This project is licensed under the MIT License.
