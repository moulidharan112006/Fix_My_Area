import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import { ThumbsUp, MapPin, Clock, User, ChevronLeft, Calendar, Tag, Loader2, Link as LinkIcon } from 'lucide-react'
import GoogleMapReact from 'google-map-react'

const Marker = ({ text }) => (
  <div style={{ color: 'white', background: 'var(--error)', padding: '5px 10px', borderRadius: '20px', display: 'inline-flex', transform: 'translate(-50%, -100%)', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', fontWeight: 'bold' }}>
    <MapPin size={14} />
    {text}
  </div>
);

const IssueDetail = () => {
  const { id } = useParams()
  const [issue, setIssue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchIssue()
  }, [id])

  const fetchIssue = async () => {
    try {
      const res = await axios.get(`/api/issues/${id}`)
      setIssue(res.data)
    } catch (err) {
      setError('Issue not found.')
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async () => {
    try {
      await axios.post('/api/votes/', { issue_id: issue.id })
      fetchIssue()
    } catch (err) {
      if (err.response?.status === 200) fetchIssue()
    }
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem' }}>
      <Loader2 className="animate-spin" size={48} color="var(--primary)" />
    </div>
  )

  if (error || !issue) return <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}><h1>{error}</h1></div>

  const defaultProps = {
    center: {
      lat: issue.latitude,
      lng: issue.longitude
    },
    zoom: 15
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <ChevronLeft size={18} /> Back to dashboard
      </button>

      <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '2rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass" style={{ overflow: 'hidden' }}>
            <div style={{ height: '400px', background: '#1e293b' }}>
              {issue.image_url ? (
                <img src={issue.image_url} alt={issue.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: '1rem' }}>
                  <Calendar size={48} />
                  <span>No reference image uploaded</span>
                </div>
              )}
            </div>
            
            <div style={{ padding: '2rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span className={`badge badge-${issue.status.toLowerCase()}`}>{issue.status}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                     <Tag size={16} />
                     <span>{issue.category}</span>
                  </div>
               </div>
               
               <h1 style={{ marginBottom: '1rem' }}>{issue.title}</h1>
               
               <div style={{ color: 'var(--text)', whiteSpace: 'pre-wrap', marginBottom: '2rem', lineHeight: '1.8' }}>
                 {issue.description}
               </div>

               <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                  <div style={{ display: 'flex', items: 'center', gap: '0.8rem' }}>
                     <div style={{ padding: '0.5rem', background: 'var(--surface-light)', borderRadius: '50%' }}><User size={20} color="var(--primary)" /></div>
                     <div>
                        <p style={{ fontSize: '0.75rem', marginBottom: '0.1rem' }}>Reported by</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 600 }}>Resident Developer</p>
                     </div>
                  </div>
                  <div style={{ display: 'flex', items: 'center', gap: '0.8rem' }}>
                     <div style={{ padding: '0.5rem', background: 'var(--surface-light)', borderRadius: '50%' }}><Clock size={20} color="var(--secondary)" /></div>
                     <div>
                        <p style={{ fontSize: '0.75rem', marginBottom: '0.1rem' }}>Reported on</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 600 }}>{new Date(issue.created_at).toLocaleDateString()}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <div className="glass" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                 <p style={{ fontWeight: 600 }}>Community Priority</p>
                 <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{issue.vote_count}</span>
              </div>
              <button 
                onClick={handleVote} 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', background: issue.has_voted ? 'var(--primary)' : 'var(--surface-light)', color: 'white' }}
              >
                <ThumbsUp size={20} fill={issue.has_voted ? 'white' : 'none'} />
                <span>{issue.has_voted ? 'Upvoted' : 'Upvote this issue'}</span>
              </button>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.8rem' }}>
                Upvote to increase the visibility of this issue to authorities.
              </p>
           </div>

           <div className="glass" style={{ padding: '0.5rem', height: '300px', overflow: 'hidden' }}>
             <GoogleMapReact
                bootstrapURLKeys={{ key: "" }} // User should provide their key
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <Marker
                  lat={issue.latitude}
                  lng={issue.longitude}
                  text="Issue Location"
                />
              </GoogleMapReact>
           </div>
           
           <div className="glass" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LinkIcon size={16} color="var(--primary)" /> Share Issue
              </h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Help spread the word to get faster resolution.</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }}>Copy Link</button>
                <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }}>Twitter</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default IssueDetail
