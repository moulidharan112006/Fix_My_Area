import React from 'react'
import { Droplets, Construction, Trash2, Zap, AlertTriangle } from 'lucide-react'

const AuthWrapper = ({ children, title, subtitle }) => {
  return (
    <div className="auth-container">
      <div className="auth-visual">
        <div className="auth-overlay"></div>
        <div className="auth-content-left">
          <div className="brand-badge">
            <Construction size={20} />
            <span>Civic Platform</span>
          </div>
          <h1>Better Neighborhoods, <br />Together.</h1>
          <p>Join Fix My Area to report and track local issues in real-time. Together we can make our city better.</p>
          
          <div className="issue-types">
            <div className="issue-item">
              <div className="issue-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                <Construction size={20} />
              </div>
              <span>Road Damage</span>
            </div>
            <div className="issue-item">
              <div className="issue-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}>
                <Droplets size={20} />
              </div>
              <span>Water Leakage</span>
            </div>
            <div className="issue-item">
              <div className="issue-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                <Trash2 size={20} />
              </div>
              <span>Waste Management</span>
            </div>
            <div className="issue-item">
              <div className="issue-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
                <Zap size={20} />
              </div>
              <span>Street Lights</span>
            </div>
          </div>
        </div>
        
        {/* Floating elements for extra creativity */}
        <div className="floating-element f-1"><AlertTriangle size={24} /></div>
        <div className="floating-element f-2"><Droplets size={32} /></div>
        <div className="floating-element f-3"><Construction size={40} /></div>
      </div>
      
      <div className="auth-form-side">
        {children}
      </div>
    </div>
  )
}

export default AuthWrapper
