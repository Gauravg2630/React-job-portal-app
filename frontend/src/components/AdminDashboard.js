import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../api'; // your fetch wrapper with credentials
import JobForm from './JobForm';

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingJob, setEditingJob] = useState(null); // job being edited
  const [formVisible, setFormVisible] = useState(false);

  // Fetch jobs
  async function loadJobs() {
    setLoading(true);
    try {
      const res = await fetchWithAuth('/jobs');
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data);
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  // Delete job
  async function deleteJob(id) {
    if (!window.confirm('Delete this job?')) return;
    try {
      const res = await fetchWithAuth(`/jobs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete job');
      alert('Job deleted');
      loadJobs();
    } catch (e) {
      alert(e.message);
    }
  }

  // Show form for new job
  function handleAddJob() {
    setEditingJob(null);
    setFormVisible(true);
  }

  // Show form for editing job
  function handleEditJob(job) {
    setEditingJob(job);
    setFormVisible(true);
  }

  // On form submit reload jobs and hide form
  function handleFormSubmit() {
    setFormVisible(false);
    loadJobs();
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleAddJob}>Add New Job</button>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: '1rem', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Role</th>
              <th>Location</th>
              <th>Remote</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.role}</td>
                <td>{job.location}</td>
                <td>{job.remote ? 'Yes' : 'No'}</td>
                <td>{job.description}</td>
                <td>
                  <button onClick={() => handleEditJob(job)}>Edit</button>
                  <button onClick={() => deleteJob(job.id)} style={{ marginLeft: '8px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {formVisible && (
        <JobForm
          job={editingJob}
          onCancel={() => setFormVisible(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
