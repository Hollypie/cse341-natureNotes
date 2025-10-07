const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all trails
const getAllTrails = async (req, res) => {
  try {
    const trails = await mongodb.getDb().collection('trails').find().toArray();
    res.status(200).json(trails);
  } catch (err) {
    res.status(500).json({ message: 'Fetching trails failed.' });
  }
};

// GET a single trail by ID
const getSingleTrail = async (req, res) => {
  try {
    let trailId;
    try {
      trailId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid trail ID format.' });
    }

    const trail = await mongodb.getDb().collection('trails').findOne({ _id: trailId });
    if (!trail) return res.status(404).json({ message: 'Trail not found.' });

    res.status(200).json(trail);
  } catch (err) {
    res.status(500).json({ message: 'Fetching trail failed.' });
  }
};

// CREATE a new trail
const createTrail = async (req, res) => {
  try {
    const {
      name,
      location,
      distance_miles,
      difficulty,
      type,
      elevation_gain_ft,
      rating
    } = req.body;

    if (!name || !location || distance_miles === undefined || !difficulty || !type || elevation_gain_ft === undefined || rating === undefined) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const trail = {
      name,
      location,
      distance_miles: Number(distance_miles),
      difficulty,
      type,
      elevation_gain_ft: Number(elevation_gain_ft),
      rating: Number(rating)
    };

    const response = await mongodb.getDb().collection('trails').insertOne(trail);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create trail.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

// UPDATE an existing trail
const updateTrail = async (req, res) => {
  try {
    let trailId;
    try {
      trailId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid trail ID format.' });
    }

    const { name, location, distance_miles, difficulty, type, elevation_gain_ft, rating } = req.body;

    if (!name || !location || distance_miles === undefined || !difficulty || !type || elevation_gain_ft === undefined || rating === undefined) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updateDoc = {
      $set: {
        name,
        location,
        distance_miles: Number(distance_miles),
        difficulty,
        type,
        elevation_gain_ft: Number(elevation_gain_ft),
        rating: Number(rating)
      }
    };

    const response = await mongodb.getDb().collection('trails').updateOne({ _id: trailId }, updateDoc);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Trail not found.' });
    }

    res.status(200).json({ message: 'Trail updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

// DELETE a trail
const deleteTrail = async (req, res) => {
  try {
    let trailId;
    try {
      trailId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid trail ID format.' });
    }

    const response = await mongodb.getDb().collection('trails').deleteOne({ _id: trailId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Trail not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

module.exports = {
  getAllTrails,
  getSingleTrail,
  createTrail,
  updateTrail,
  deleteTrail
};
