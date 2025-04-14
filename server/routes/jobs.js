const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST new job
router.post('/', async (req, res) => {
  const { title, company, type, location, description } = req.body;
  if (!title || !company || !type || !location || !description) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const newJob = new Job({ title, company, type, location, description });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
