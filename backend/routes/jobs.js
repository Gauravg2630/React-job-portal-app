const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get jobs with optional filters: role, location, remote (boolean)
router.get('/', async (req, res) => {
  const { role, location, remote } = req.query;
  let query = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];

  if (role) {
    query += ' AND role LIKE ?';
    params.push(`%${role}%`);
  }
  if (location) {
    query += ' AND location LIKE ?';
    params.push(`%${location}%`);
  }
  if (remote !== undefined) {
    // Accept only "true" or "false" strings
    if (remote === 'true' || remote === 'false') {
      query += ' AND remote = ?';
      params.push(remote === 'true' ? 1 : 0);
    } else {
      return res.status(400).json({ error: 'Invalid remote filter value' });
    }
  }

  try {
    const [rows] = await db.query(query, params);
    return res.json(rows);  // Send job list as JSON
  } catch (err) {
    console.error('Error fetching jobs:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Create a new job (admin only)
router.post('/', authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });

  const { title, role, location, remote, description } = req.body;
  if (!title || !role || !location || description === undefined) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    await db.query(
      'INSERT INTO jobs (title, role, location, remote, description) VALUES (?, ?, ?, ?, ?)',
      [title, role, location, remote ? 1 : 0, description]
    );
    return res.status(201).json({ message: 'Job created' });
  } catch (err) {
    console.error('Error creating job:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update job by id (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });

  const id = req.params.id;
  const { title, role, location, remote, description } = req.body;
  if (!title || !role || !location || description === undefined) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const [result] = await db.query(
      'UPDATE jobs SET title=?, role=?, location=?, remote=?, description=? WHERE id=?',
      [title, role, location, remote ? 1 : 0, description, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Job not found' });
    return res.json({ message: 'Job updated' });
  } catch (err) {
    console.error('Error updating job:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Delete job by id (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });

  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM jobs WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Job not found' });
    return res.json({ message: 'Job deleted' });
  } catch (err) {
    console.error('Error deleting job:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
  