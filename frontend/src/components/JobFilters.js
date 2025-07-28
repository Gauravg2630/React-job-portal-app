import React from 'react';

export default function JobFilters({ filters, setFilters }) {
  function handleChange(e) {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="filters">
      <input
        name="role"
        placeholder="Role"
        value={filters.role}
        onChange={handleChange}
      />
      <input
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={handleChange}
      />
      <select name="remote" value={filters.remote} onChange={handleChange}>
        <option value="">Remote?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  );
}
