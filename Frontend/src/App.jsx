import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ReportIssue from './pages/ReportIssue'
import IssueDetail from './pages/IssueDetail'
import AdminDashboard from './pages/AdminDashboard'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <div className="loading-screen">Loading...</div>
  
  if (!user) return <Navigate to="/login" />
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />
  }
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/report" element={
              <ProtectedRoute>
                <ReportIssue />
              </ProtectedRoute>
            } />
            
            <Route path="/issues/:id" element={
              <ProtectedRoute>
                <IssueDetail />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
