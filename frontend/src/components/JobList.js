import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../api';
import JobFilters from './JobFilters';
import Spinner from './Spinner';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ role: '', location: '', remote: '' });
  const [loading, setLoading] = useState(false);
  const [applyLoading, setApplyLoading] = useState(null); // id of applying job

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      let query = [];
      if (filters.role) query.push(`role=${filters.role}`);
      if (filters.location) query.push(`location=${filters.location}`);
      if (filters.remote) query.push(`remote=${filters.remote}`);
      const queryStr = query.length > 0 ? `?${query.join('&')}` : '';
      try {
        const res = await fetchWithAuth(`/jobs${queryStr}`);
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (e) {
        alert(e.message);
      }
      setLoading(false);
    }

    fetchJobs();
  }, [filters]);  // runs whenever filters change

  async function applyJob(id) {
    if (!window.confirm('Apply for this job?')) return;
    setApplyLoading(id);
    try {
      const res = await fetchWithAuth(`/jobs/${id}/apply`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to apply');
      alert('Applied successfully!');
    } catch (e) {
      alert(e.message);
    }
    setApplyLoading(null);
  }

  return (
    <div className="job-list-container">
      <h2>Job Listings</h2>
      <JobFilters filters={filters} setFilters={setFilters} />
      {loading ? (
        <Spinner />
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="job-list">
          {jobs.map(job => (
            <li key={job.id} className="job-item">
              <h3>{job.title}</h3>
              <p><b>Role:</b> {job.role}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Remote:</b> {job.remote ? 'Yes' : 'No'}</p>
              <button
                onClick={() => applyJob(job.id)}
                disabled={applyLoading === job.id}
              >
                {applyLoading === job.id ? 'Applying...' : 'Apply'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
