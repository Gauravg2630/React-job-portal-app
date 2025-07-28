import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../api';
import JobForm from './JobForm';
import Spinner from './Spinner';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  async function fetchJobs() {
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
    fetchJobs();
  }, []);

  function openForm(job = null) {
    setEditingJob(job);
    setFormVisible(true);
  }

  function closeForm() {
    setEditingJob(null);
    setFormVisible(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this job?')) return;
    setActionLoading(true);
    try {
      const res = await fetchWithAuth(`/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      alert('Deleted!');
      fetchJobs();
    } catch (e) {
      alert(e.message);
    }
    setActionLoading(false);
  }

  async function handleSave(job) {
    setActionLoading(true);
    try {
      let res;
      if (editingJob) {
        res = await fetchWithAuth(`/jobs/${editingJob.id}`, {
          method: 'PUT',
          body: JSON.stringify(job),
        });
      } else {
        res = await fetchWithAuth('/jobs', {
          method: 'POST',
          body: JSON.stringify(job),
        });
      }
      if (!res.ok) throw new Error('Save failed');
      alert('Saved!');
      fetchJobs();
      closeForm();
    } catch (e) {
      alert(e.message);
    }
    setActionLoading(false);
  }

  return (
    <div className="admin-jobs-container">
      <h2>Admin Job Management</h2>
      <button onClick={() => openForm()} disabled={actionLoading}>Add New Job</button>

      {loading ? <Spinner /> : (
        <ul className="job-list">
          {jobs.map(job => (
            <li key={job.id} className="job-item">
              <h3>{job.title}</h3>
              <p><b>Role:</b> {job.role}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Remote:</b> {job.remote ? 'Yes' : 'No'}</p>
              <div>
                <button onClick={() => openForm(job)} disabled={actionLoading}>Edit</button>
                <button onClick={() => handleDelete(job.id)} disabled={actionLoading}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {formVisible && (
        <JobForm
          job={editingJob}
          onCancel={closeForm}
          onSave={handleSave}
          loading={actionLoading}
        />
      )}
    </div>
  );
}
