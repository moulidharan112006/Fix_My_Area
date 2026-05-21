import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Construction, LogOut, User, PlusCircle, LayoutDashboard } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <nav className="glass" style={{ margin: '1rem', padding: '0.8rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100 }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)' }}>
        <img src="/logo.png" alt="Fix My Area Logo" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
        <span>Fix My<span style={{ color: 'var(--primary)' }}> Area</span></span>
      </Link>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
        <Link to="/report" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
          <Construction size={18} />
          <span>Report Issue</span>
        </Link>
        
        {user.role === 'admin' && (
          <Link to="/admin" style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Admin</Link>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <User size={18} color="var(--text-muted)" />
             <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user.name}</span>
          </div>
          <button onClick={logout} style={{ background: 'transparent', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
