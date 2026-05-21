import { Link } from 'react-router-dom'
import { ThumbsUp, MapPin, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import axios from 'axios'
import { useState } from 'react'

const IssueCard = ({ issue, onUpdate }) => {
  const [voted, setVoted] = useState(issue.has_voted)
  const [votes, setVotes] = useState(issue.vote_count)

  const handleVote = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await axios.post('/api/votes/', { issue_id: issue.id })
      setVoted(!voted)
      setVotes(voted ? votes - 1 : votes + 1)
      if (onUpdate) onUpdate()
    } catch (err) {
      if (err.response?.status === 200) {
        setVoted(!voted)
        setVotes(voted ? votes - 1 : votes + 1)
      }
    }
  }

  const getStatusClass = (status) => {
    return `badge badge-${status.toLowerCase()}`
  }

  return (
    <Link to={`/issues/${issue.id}`} className="glass fade-in" style={{ display: 'block', overflow: 'hidden', transition: 'transform 0.3s' }}>
      <div style={{ height: '200px', width: '100%', position: 'relative', background: '#1e293b' }}>
        {issue.image_url ? (
          <img src={issue.image_url} alt={issue.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            No Image Provided
          </div>
        )}
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <span className={getStatusClass(issue.status)}>{issue.status}</span>
        </div>
      </div>
      
      <div style={{ padding: '1.2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{issue.title}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '0.3rem' }}>
            {issue.category}
          </span>
        </div>
        
        <p style={{ fontSize: '0.9rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {issue.description}
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={14} />
            <span>Near You</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={14} />
            <span>{formatDistanceToNow(new Date(issue.created_at))} ago</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
          <button 
            onClick={handleVote}
            className="btn"
            style={{ 
              background: voted ? 'var(--primary)' : 'var(--surface-light)',
              color: voted ? 'white' : 'var(--text)',
              padding: '0.4rem 0.8rem',
              fontSize: '0.9rem'
            }}
          >
            <ThumbsUp size={16} fill={voted ? 'white' : 'none'} />
            <span>{votes} Votes</span>
          </button>
          
          <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--primary)' }}>View Details →</span>
        </div>
      </div>
    </Link>
  )
}

export default IssueCard
