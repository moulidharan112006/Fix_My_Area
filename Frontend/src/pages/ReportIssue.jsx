import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MapPin, Camera, Info, Loader2, ArrowLeft, CheckCircle } from 'lucide-react'

const ReportIssue = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Garbage')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const navigate = useNavigate()
  const categories = ['Garbage', 'Water Leakage', 'Road Damage', 'Street Light', 'Other']

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const detectLocation = () => {
    setLocating(true)
    setError('')
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      setLocating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setLocating(false)
      },
      (err) => {
        setError('Unable to retrieve your location. Please enter coordinates manually.')
        setLocating(false)
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!latitude || !longitude) {
      setError('Please provide location coordinates.')
      return
    }

    setLoading(true)
    setError('')
    
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    if (image) formData.append('image', image)

    try {
      await axios.post('/api/issues/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setSuccess(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to report issue.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', marginBottom: '1.5rem' }}>
          <CheckCircle size={64} color="var(--success)" />
        </div>
        <h1>Issue Reported Successfully!</h1>
        <p>Thank you for helping improve our community. Redirecting to dashboard...</p>
      </div>
    )
  }

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={18} /> Back
      </button>
      
      <div style={{ marginBottom: '2.5rem' }}>
        <h1>Report a Local Issue</h1>
        <p>Provide details about the civic problem you encountered.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={20} color="var(--primary)" /> Issue Details
          </h2>
          
          <div className="input-group">
            <label className="input-label">Title</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Broken street light in sector 4" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Category</label>
            <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea 
              className="input-field" 
              rows="4" 
              placeholder="Provide more details about the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: 'none' }}
              required
            ></textarea>
          </div>
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={20} color="var(--primary)" /> Location & Image
          </h2>

          <div className="input-group">
            <label className="input-label">Location</label>
            <button 
              type="button" 
              onClick={detectLocation} 
              className="btn btn-secondary" 
              style={{ width: '100%', marginBottom: '1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderColor: 'var(--primary)' }}
              disabled={locating}
            >
              {locating ? <Loader2 className="animate-spin" size={18} /> : <MapPin size={18} />}
              {locating ? ' Detecting...' : 'Detect My Location'}
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
               <input type="number" step="any" placeholder="Latitude" className="input-field" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
               <input type="number" step="any" placeholder="Longitude" className="input-field" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Photo (Optional)</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 10 }}
              />
              <div className="input-field" style={{ height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', borderStyle: 'dashed', borderColor: image ? 'var(--primary)' : 'var(--glass-border)' }}>
                {imagePreview ? (
                  <img src={imagePreview} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }} />
                ) : (
                  <>
                    <Camera size={32} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Click to upload image</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && <p style={{ color: 'var(--error)', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ padding: '1rem' }} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={24} /> : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReportIssue
