const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all wildlife sightings
const getAllSightings = async (req, res) => {
  try {
    const sightings = await mongodb.getDb().collection('wildlife').find().toArray();
    res.status(200).json(sightings);
  } catch (err) {
    res.status(500).json({ message: 'Fetching sightings failed.' });
  }
};

// GET a single sighting by ID
const getSingleSighting = async (req, res) => {
  try {
    let sightingId;
    try {
      sightingId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid sighting ID format.' });
    }

    const sighting = await mongodb.getDb().collection('wildlife').findOne({ _id: sightingId });
    if (!sighting) return res.status(404).json({ message: 'Sighting not found.' });

    res.status(200).json(sighting);
  } catch (err) {
    res.status(500).json({ message: 'Fetching sighting failed.' });
  }
};

// CREATE a new sighting
const createSighting = async (req, res) => {
  try {
    const { species, location, date, time, observer, count, trailId } = req.body;

    if (!species || !location || !date || !time || !observer || count == null || !trailId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (isNaN(count)) {
      return res.status(400).json({ message: 'Count must be a valid number.' });
    }

    let validTrailId;
    try {
      validTrailId = new ObjectId(trailId);
    } catch {
      return res.status(400).json({ message: 'Invalid trail ID format.' });
    }

    const sighting = {
      species,
      location,
      date, // or new Date(date) if using Date objects
      time,
      observer,
      count: Number(count),
      trailId: validTrailId
    };

    const response = await mongodb.getDb().collection('wildlife').insertOne(sighting);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create sighting.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

// UPDATE an existing sighting
const updateSighting = async (req, res) => {
  try {
    let sightingId;
    try {
      sightingId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid sighting ID format.' });
    }

    const { species, location, date, time, observer, count, trailId } = req.body;

    if (!species || !location || !date || !time || !observer || count == null || !trailId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (isNaN(count)) {
      return res.status(400).json({ message: 'Count must be a valid number.' });
    }

    let validTrailId;
    try {
      validTrailId = new ObjectId(trailId);
    } catch {
      return res.status(400).json({ message: 'Invalid trail ID format.' });
    }

    const updateDoc = {
      $set: {
        species,
        location,
        date,
        time,
        observer,
        count: Number(count),
        trailId: validTrailId
      }
    };

    const response = await mongodb.getDb()
      .collection('wildlife')
      .updateOne({ _id: sightingId }, updateDoc);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Sighting not found.' });
    }

    res.status(200).json({ message: 'Sighting updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

// DELETE a sighting
const deleteSighting = async (req, res) => {
  try {
    let sightingId;
    try {
      sightingId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid sighting ID format.' });
    }

    const response = await mongodb.getDb().collection('wildlife').deleteOne({ _id: sightingId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Sighting not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

module.exports = {
  getAllSightings,
  getSingleSighting,
  createSighting,
  updateSighting,
  deleteSighting
};
