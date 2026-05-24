import { useState, useEffect } from 'react'
import axios from 'axios'
import IssueCard from '../components/IssueCard'
import { Filter, Search, Map as MapIcon, LayoutGrid, Loader2 } from 'lucide-react'

const Dashboard = () => {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('recent')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Garbage', 'Water Leakage', 'Road Damage', 'Street Light', 'Other']

  useEffect(() => {
    fetchIssues()
  }, [sortBy])

  const fetchIssues = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/api/issues/?sort_by=${sortBy}`)
      setIssues(res.data)
    } catch (err) {
      setError('Failed to load issues.')
    } finally {
      setLoading(false)
    }
  }

  const filteredIssues = issues.filter(issue => {
    const matchesCategory = category === 'All' || issue.category === category
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          issue.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.2rem' }}>Community Issues</h1>
          <p>Explore and support local civic improvements</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" style={{ padding: '0.6rem 1rem' }}>
            <MapIcon size={18} />
            <span>Map View</span>
          </button>
        </div>
      </div>

      <header className="glass" style={{ padding: '1.2rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search issues..." 
            className="input-field" 
            style={{ paddingLeft: '3rem', marginBottom: 0 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} color="var(--text-muted)" />
            <select 
              className="input-field" 
              style={{ width: 'auto', paddingRight: '2rem', marginBottom: 0 }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LayoutGrid size={18} color="var(--text-muted)" />
            <select 
              className="input-field" 
              style={{ width: 'auto', paddingRight: '2rem', marginBottom: 0 }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="votes">Top Voted</option>
            </select>
          </div>
        </div>
      </header>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <Loader2 className="animate-spin" size={48} color="var(--primary)" />
        </div>
      ) : error ? (
        <div className="glass" style={{ padding: '2rem', textAlign: 'center', color: 'var(--error)' }}>
          {error}
        </div>
      ) : filteredIssues.length === 0 ? (
        <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>No issues found matching your criteria.</p>
          <button className="btn btn-primary" onClick={() => {setCategory('All'); setSearchQuery('')}}>Clear Filters</button>
        </div>
      ) : (
        <div className="grid">
          {filteredIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} onUpdate={fetchIssues} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
