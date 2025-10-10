const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { ObjectId } = require('mongodb');
const gearController = require('../controllers/gear');

// Mock the mongodb module and ObjectId
const mockDb = {
  collection: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  toArray: jest.fn(),
  findOne: jest.fn()
};

jest.mock('../data/database', () => ({
  getDb: jest.fn(() => mockDb)
}));

jest.mock('mongodb', () => {
  const mockObjectId = function(id) { this.id = id; };
  mockObjectId.isValid = jest.fn(id => /^[0-9a-fA-F]{24}$/.test(id));
  return { ObjectId: mockObjectId };
});

describe('Gear Endpoints', () => {
  let req, res;
  
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    // Reset all mocks
    jest.clearAllMocks();
    mockDb.toArray.mockReset();
    mockDb.findOne.mockReset();
    mockDb.collection.mockReturnThis();
  });

  const mockGearData = [
    {
      _id: new ObjectId('654321654321654321654321'),
      name: "Osprey Daylite Backpack",
      type: "Backpack",
      brand: "Osprey",
      weightOz: 16,
      category: "Hiking",
      condition: "Excellent",
      owner: "hollyb",
      purchaseDate: "2024-03-15",
      favorite: true,
      notes: "Lightweight and comfortable for short day hikes."
    }
  ];

  it('GET /gear should return all gear items', async () => {
    mockDb.toArray.mockResolvedValue(mockGearData);
    await gearController.getAllGear(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('gear');
    expect(mockDb.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockGearData);
  });

  it('GET /gear should handle database errors', async () => {
    mockDb.toArray.mockRejectedValue(new Error('Database error'));
    await gearController.getAllGear(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Fetching gear failed.' });
  });

  it('GET /gear/:id should return a specific gear item', async () => {
    const gearId = '654321654321654321654321';
    const singleGear = mockGearData[0];
    
    mockDb.findOne.mockResolvedValue(singleGear);
    req.params = { id: gearId };
    
    await gearController.getSingleGear(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('gear');
    expect(mockDb.findOne).toHaveBeenCalledWith({ _id: new ObjectId(gearId) });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(singleGear);
  });

  it('GET /gear/:id should return 400 for invalid ID format', async () => {
    req.params = { id: 'invalidid' };
    await gearController.getSingleGear(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid gear ID format.' });
  });

  it('GET /gear/:id should return 404 when gear not found', async () => {
    const validId = '654321654321654321654321';
    mockDb.findOne.mockResolvedValue(null);

    req.params = { id: validId };
    await gearController.getSingleGear(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Gear not found.' });
  });

  it('GET /gear/:id should handle database errors', async () => {
    const validId = '654321654321654321654321';
    mockDb.findOne.mockRejectedValue(new Error('Database error'));

    req.params = { id: validId };
    await gearController.getSingleGear(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Fetching gear failed.' });
  });

  // CREATE tests
  it('POST /gear should create a new gear item', async () => {
    const newGear = {
      name: "New Backpack",
      type: "Backpack",
      brand: "Test Brand",
      weightOz: "20",
      category: "Hiking",
      condition: "New",
      owner: "testuser",
      purchaseDate: "2025-10-10",
      favorite: "true",
      notes: "Test notes"
    };
    const insertedId = new ObjectId('654321654321654321654321');
    mockDb.insertOne = jest.fn().mockResolvedValue({ acknowledged: true, insertedId });
    
    req.body = newGear;
    await gearController.createGear(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('gear');
    expect(mockDb.insertOne).toHaveBeenCalledWith({
      ...newGear,
      weightOz: 20,
      favorite: true
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: insertedId });
  });

  it('POST /gear should return 400 if required fields are missing', async () => {
    const incompleteGear = {
      name: "New Backpack",
      // missing required fields
    };
    
    req.body = incompleteGear;
    await gearController.createGear(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required.' });
  });

  // UPDATE tests
  it('PUT /gear/:id should update an existing gear item', async () => {
    const gearId = '654321654321654321654321';
    const updateData = {
      condition: "Used",
      weightOz: "25",
      favorite: "false"
    };
    mockDb.updateOne = jest.fn().mockResolvedValue({ matchedCount: 1 });
    
    req.params = { id: gearId };
    req.body = updateData;
    await gearController.updateGear(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('gear');
    expect(mockDb.updateOne).toHaveBeenCalledWith(
      { _id: new ObjectId(gearId) },
      { $set: { ...updateData, weightOz: 25, favorite: false } }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Gear updated successfully.' });
  });

  it('PUT /gear/:id should return 404 if gear not found', async () => {
    const gearId = '654321654321654321654321';
    mockDb.updateOne = jest.fn().mockResolvedValue({ matchedCount: 0 });
    
    req.params = { id: gearId };
    req.body = { condition: "Used" };
    await gearController.updateGear(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Gear not found.' });
  });

  it('PUT /gear/:id should return 400 if no update fields provided', async () => {
    const gearId = '654321654321654321654321';
    req.params = { id: gearId };
    req.body = {};
    await gearController.updateGear(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'At least one field is required to update.' });
  });

  // DELETE tests
  it('DELETE /gear/:id should delete a gear item', async () => {
    const gearId = '654321654321654321654321';
    mockDb.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
    
    req.params = { id: gearId };
    await gearController.deleteGear(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('gear');
    expect(mockDb.deleteOne).toHaveBeenCalledWith({ _id: new ObjectId(gearId) });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('DELETE /gear/:id should return 404 if gear not found', async () => {
    const gearId = '654321654321654321654321';
    mockDb.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });
    
    req.params = { id: gearId };
    await gearController.deleteGear(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Gear not found.' });
  });
});