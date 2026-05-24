import { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckCircle, Clock, AlertCircle, Trash2, Edit, Loader2, Filter } from 'lucide-react'

const AdminDashboard = () => {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)
  
  useEffect(() => {
    fetchIssues()
  }, [])

  const fetchIssues = async () => {
    try {
      const res = await axios.get('/api/issues/')
      setIssues(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    setUpdating(id)
    try {
      await axios.patch(`/api/issues/${id}`, { status })
      fetchIssues()
    } catch (err) {
      alert('Failed to update status')
    } finally {
      setUpdating(null)
    }
  }

  const deleteIssue = async (id) => {
    if (!window.confirm('Are you sure you want to delete this issue?')) return
    try {
      await axios.delete(`/api/issues/${id}`)
      fetchIssues()
    } catch (err) {
      alert('Failed to delete issue')
    }
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem' }}>
      <Loader2 className="animate-spin" size={48} color="var(--primary)" />
    </div>
  )

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Admin Control Panel</h1>
        <p>Monitor and manage community reported issues.</p>
      </div>

      <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>All Reported Issues ({issues.length})</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--warning)' }}><AlertCircle size={14} /> Pending</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--primary)' }}><Clock size={14} /> In Progress</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--success)' }}><CheckCircle size={14} /> Resolved</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <th style={{ padding: '1.2rem' }}>Issue</th>
                <th style={{ padding: '1.2rem' }}>Category</th>
                <th style={{ padding: '1.2rem' }}>Votes</th>
                <th style={{ padding: '1.2rem' }}>Current Status</th>
                <th style={{ padding: '1.2rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map(issue => (
                <tr key={issue.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.3s' }}>
                  <td style={{ padding: '1.2rem' }}>
                    <div style={{ fontWeight: 600 }}>{issue.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: #{issue.id} • {new Date(issue.created_at).toLocaleDateString()}</div>
                  </td>
                  <td style={{ padding: '1.2rem' }}>
                    <span style={{ fontSize: '0.85rem' }}>{issue.category}</span>
                  </td>
                  <td style={{ padding: '1.2rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{issue.vote_count}</span>
                  </td>
                  <td style={{ padding: '1.2rem' }}>
                    <select 
                      className={`badge badge-${issue.status.toLowerCase()}`}
                      style={{ border: '1px solid currentColor', cursor: 'pointer', outline: 'none' }}
                      value={issue.status}
                      onChange={(e) => updateStatus(issue.id, e.target.value)}
                      disabled={updating === issue.id}
                    >
                      <option value="pending">PENDING</option>
                      <option value="in_progress">IN PROGRESS</option>
                      <option value="resolved">RESOLVED</option>
                    </select>
                  </td>
                  <td style={{ padding: '1.2rem' }}>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                      <button 
                        onClick={() => deleteIssue(issue.id)}
                        style={{ background: 'transparent', color: 'var(--error)', padding: '0.4rem' }}
                        title="Delete Issue"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {issues.length === 0 && (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No issues reported yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
