const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { ObjectId } = require('mongodb');
const hikersController = require('../controllers/hikers');

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

describe('Hikers Endpoints', () => {
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

  const mockHikerData = [
    {
      _id: new ObjectId('654321654321654321654321'),
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      location: "Provo, UT",
      memberSince: "2025-01-01",
      isAdmin: false,
      trailCount: 5,
      bio: "Hiking enthusiast"
    }
  ];

  it('GET /hikers should return all hikers', async () => {
    mockDb.toArray.mockResolvedValue(mockHikerData);
    await hikersController.getAllHikers(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('hikers');
    expect(mockDb.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockHikerData);
  });

  it('GET /hikers should handle database errors', async () => {
    mockDb.toArray.mockRejectedValue(new Error('Database error'));
    await hikersController.getAllHikers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Fetching hikers failed.' });
  });

  it('GET /hikers/:id should return a specific hiker', async () => {
    const hikerId = '654321654321654321654321';
    const singleHiker = mockHikerData[0];
    
    mockDb.findOne.mockResolvedValue(singleHiker);
    req.params = { id: hikerId };
    
    await hikersController.getSingleHiker(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('hikers');
    expect(mockDb.findOne).toHaveBeenCalledWith({ _id: new ObjectId(hikerId) });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(singleHiker);
  });

  it('GET /hikers/:id should return 400 for invalid ID format', async () => {
    req.params = { id: 'invalidid' };
    await hikersController.getSingleHiker(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid hiker ID format.' });
  });

  it('GET /hikers/:id should return 404 when hiker not found', async () => {
    const validId = '654321654321654321654321';
    mockDb.findOne.mockResolvedValue(null);

    req.params = { id: validId };
    await hikersController.getSingleHiker(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Hiker not found.' });
  });

  it('GET /hikers/:id should handle database errors', async () => {
    const validId = '654321654321654321654321';
    mockDb.findOne.mockRejectedValue(new Error('Database error'));

    req.params = { id: validId };
    await hikersController.getSingleHiker(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Fetching hiker failed.' });
  });

  it('PUT /hikers/:id should update an existing hiker', async () => {
    const hikerId = '654321654321654321654321';
    const updateData = {
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      location: "Provo, UT",
      memberSince: "2025-10-10",
      isAdmin: false,
      trailCount: 1,
      bio: "Updated bio"
    };
    mockDb.updateOne = jest.fn().mockResolvedValue({ matchedCount: 1 });
    
    req.params = { id: hikerId };
    req.body = updateData;
    await hikersController.updateHiker(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('hikers');
    expect(mockDb.updateOne).toHaveBeenCalledWith(
      { _id: new ObjectId(hikerId) },
      { $set: updateData }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Hiker updated successfully.' });
  });

  it('PUT /hikers/:id should return 404 if hiker not found', async () => {
    const hikerId = '654321654321654321654321';
    const updateData = {
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      location: "Provo, UT",
      memberSince: "2025-10-10",
      isAdmin: false,
      trailCount: 1,
      bio: "Updated bio"
    };
    mockDb.updateOne = jest.fn().mockResolvedValue({ matchedCount: 0 });
    
    req.params = { id: hikerId };
    req.body = updateData;
    await hikersController.updateHiker(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Hiker not found.' });
  });

  it('PUT /hikers/:id should return 400 for invalid ID format', async () => {
    req.params = { id: 'invalidid' };
    const updateData = {
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      location: "Provo, UT",
      memberSince: "2025-10-10",
      isAdmin: false,
      trailCount: 1,
      bio: "Updated bio"
    };
    req.body = updateData;
    await hikersController.updateHiker(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid hiker ID format.' });
  });

  it('DELETE /hikers/:id should delete a hiker', async () => {
    const hikerId = '654321654321654321654321';
    mockDb.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
    
    req.params = { id: hikerId };
    await hikersController.deleteHiker(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('hikers');
    expect(mockDb.deleteOne).toHaveBeenCalledWith({ _id: new ObjectId(hikerId) });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('DELETE /hikers/:id should return 404 if hiker not found', async () => {
    const hikerId = '654321654321654321654321';
    mockDb.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });
    
    req.params = { id: hikerId };
    await hikersController.deleteHiker(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Hiker not found.' });
  });
});