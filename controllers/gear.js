
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all gear
const getAllGear = async (req, res) => {
  try {
    const gear = await mongodb.getDb().collection('gear').find().toArray();
    res.status(200).json(gear);
  } catch (err) {
    res.status(500).json({ message: 'Fetching gear failed.' });
  }
};

// GET a single gear by ID
const getSingleGear = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid gear ID format.' });
    }
    const gearId = new ObjectId(req.params.id);
    const gear = await mongodb.getDb().collection('gear').findOne({ _id: gearId });
    if (!gear) return res.status(404).json({ message: 'Gear not found.' });

    res.status(200).json(gear);
  } catch (err) {
    res.status(500).json({ message: 'Fetching gear failed.' });
  }
};

// CREATE a new gear
const createGear = async (req, res) => {
  try {
    const {
      name,
      type,
      brand,
      weightOz,
      category,
      condition,
      owner,
      purchaseDate,
      favorite,
      notes
    } = req.body;

    if (
      !name || !type || !brand || !weightOz || !category || !condition ||
      !owner || !purchaseDate || favorite === undefined || favorite === null || !notes
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const gear = {
      name,
      type,
      brand,
      weightOz: parseFloat(weightOz),
      category,
      condition,
      owner,
      purchaseDate,
      favorite: favorite === true || favorite === 'true',
      notes
    };

    const response = await mongodb.getDb().collection('gear').insertOne(gear);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create gear.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

// UPDATE an existing gear
const updateGear = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid gear ID format.' });
    }

    const gearId = new ObjectId(req.params.id);
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'At least one field is required to update.' });
    }

    if (updateFields.weightOz) {
      updateFields.weightOz = parseFloat(updateFields.weightOz);
    }

    if (updateFields.favorite !== undefined) {
      updateFields.favorite = updateFields.favorite === true || updateFields.favorite === 'true';
    }

    const response = await mongodb
      .getDb()
      .collection('gear')
      .updateOne({ _id: gearId }, { $set: updateFields });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Gear not found.' });
    }

    res.status(200).json({ message: 'Gear updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

// DELETE a gear
const deleteGear = async (req, res) => {
  try {
    let gearId;
    try {
      gearId = new ObjectId(req.params.id);
    } catch {
      return res.status(400).json({ message: 'Invalid gear ID format.' });
    }

    const response = await mongodb.getDb().collection('gear').deleteOne({ _id: gearId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Gear not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};

module.exports = {
  getAllGear,
  getSingleGear,
  createGear,
  updateGear,
  deleteGear
};
