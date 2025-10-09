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

    const response = await mongodb.getDb()
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


    const response = await mongodb.getDb().collection('gear').updateOne({ _id: gearId }, updateDoc);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Gear not found.' });
    }

    res.status(200).json({ message: 'Gear updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error.' });
  }
};
