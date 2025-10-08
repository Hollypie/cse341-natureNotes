const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all hikers
const getAllHikers = async (req, res) => {
  try {
    const hikers = await mongodb.getDb().collection('hikers').find().toArray();
    res.status(200).json(hikers);
  } catch (err) {
    res.status(500).json({ message: 'Fetching hikers failed.' });
  }
};

// GET a single hiker by ID
const getSingleHiker = async (req, res) => {
  try {
    let hikerId;
    try {
      hikerId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid hiker ID format.' });
    }

    const hiker = await mongodb.getDb().collection('hikers').findOne({ _id: hikerId });
    if (!hiker) return res.status(404).json({ message: 'Hiker not found.' });

    res.status(200).json(hiker);
  } catch (err) {
    res.status(500).json({ message: 'Fetching hiker failed.' });
  }
};

// CREATE a new hiker
const createHiker = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      location,
      memberSince,
      isAdmin,
      trailCount,
      bio
    } = req.body;

    if (!firstName || !lastName|| !username || !email || !location || !memberSince || !isAdmin || !trailCount || !bio) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const trail = {
        firstName,
        lastName,
        username,
        location,
        memberSince,
        isAdmin,
        trailCount,
        bio
    };

    const response = await mongodb.getDb().collection('hikers').insertOne(hiker);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create hiker.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

// UPDATE an existing hiker
const updateHiker = async (req, res) => {
  try {
    let hikerId;
    try {
      hikerId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid hiker ID format.' });
    }

    const { firstName, lastName, username, location, memberSince, isAdmin, trailCount, bio } = req.body;

    if (!firstName || !lastName|| !username || !email || !location || !memberSince || !isAdmin || !trailCount || !bio) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updateDoc = {
      $set: {
        firstName,
        lastName,
        username,
        location,
        memberSince,
        isAdmin,
        trailCount,
        bio
      }
    };

    const response = await mongodb.getDb().collection('hikers').updateOne({ _id: hikerId }, updateDoc);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Hiker not found.' });
    }

    res.status(200).json({ message: 'Hiker updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

// DELETE a hiker
const deleteHiker = async (req, res) => {
  try {
    let hikerId;
    try {
      hikerId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid hiker ID format.' });
    }

    const response = await mongodb.getDb().collection('hikers').deleteOne({ _id: hikerId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Hiker not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

module.exports = {
  getAllHikers,
  getSingleHiker,
  createHiker,
  updateHiker,
  deleteHiker
};
