import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api';

export default function JobForm({ job, onCancel, onSubmit }) {
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setRole(job.role);
      setLocation(job.location);
      setRemote(!!job.remote);
      setDescription(job.description);
    } else {
      setTitle('');
      setRole('');
      setLocation('');
      setRemote(false);
      setDescription('');
    }
  }, [job]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = { title, role, location, remote, description };
    try {
      const url = job ? `/jobs/${job.id}` : '/jobs';
      const method = job ? 'PUT' : 'POST';

      const res = await fetchWithAuth(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save job');
      }
      alert(`Job ${job ? 'updated' : 'created'} successfully`);
      onSubmit();
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
      <h3>{job ? 'Edit Job' : 'Add New Job'}</h3>

      <label>
        Title:<br />
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>
      <br />
      <label>
        Role:<br />
        <input value={role} onChange={e => setRole(e.target.value)} required />
      </label>
      <br />
      <label>
        Location:<br />
        <input value={location} onChange={e => setLocation(e.target.value)} required />
      </label>
      <br />
      <label>
        Remote:<br />
        <input
          type="checkbox"
          checked={remote}
          onChange={e => setRemote(e.target.checked)}
        />
      </label>
      <br />
      <label>
        Description:<br />
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
      </label>
      <br /><br />
      <button type="submit" disabled={loading}>
        {loading ? (job ? 'Updating...' : 'Creating...') : (job ? 'Update Job' : 'Create Job')}
      </button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }} disabled={loading}>
        Cancel
      </button>
    </form>
  );
}
