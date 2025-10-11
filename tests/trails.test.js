const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { ObjectId } = require('mongodb');
const trailsController = require('../controllers/trails');

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
  const mockObjectId = function (id) {
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error('Invalid ObjectId');
    }
    this.id = id;
  };
  return { ObjectId: mockObjectId };
});

describe('Trails Endpoints', () => {
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

  const mockTrailData = [
    {
      _id: new ObjectId('68e54ccadbaa1de4c3bde674'),
      trailId: 1,
      name: "Y Mountain Trail",
      location: "Provo, UT",
      distance_miles: 2.5,
      difficulty: "Moderate",
      type: "Hiking",
      elevation_gain_ft: 1000,
      rating: 4.7,
    }
  ];

  it('GET /trails should return all trails items', async () => {
    mockDb.toArray.mockResolvedValue(mockTrailData);
    await trailsController.getAllTrails(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('trails');
    expect(mockDb.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTrailData);
  });

  it('GET /trails should handle database errors', async () => {
    mockDb.toArray.mockRejectedValue(new Error('Database error'));
    await trailsController.getAllTrails(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Fetching trails failed.' });
  });

  it('GET /trails/:id should return a specific trail item', async () => {
    const trailId = '68e54ccadbaa1de4c3bde674';
    const singleTrail = mockTrailData[0];
    
    mockDb.findOne.mockResolvedValue(singleTrail);
    req.params = { id: trailId };
    
    await trailsController.getSingleTrail(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('trails');
    expect(mockDb.findOne).toHaveBeenCalledWith({ _id: new ObjectId(trailId) });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(singleTrail);
  });

  it('GET /trails/:id should return 400 for invalid ID format', async () => {
    req.params = { id: 'invalidid' };
    await trailsController.getSingleTrail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid trail ID format.' });
  });

  it('GET /trails/:id should return 404 when trail not found', async () => {
    const validId = '68e54ccadbaa1de4c3bde674';
    mockDb.findOne.mockResolvedValue(null);

    req.params = { id: validId };
    await trailsController.getSingleTrail(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Trail not found.' });
  });

  it('GET /trail/:id should handle database errors', async () => {
    const validId = '68e54ccadbaa1de4c3bde674';
    mockDb.findOne.mockRejectedValue(new Error('Database error'));

    req.params = { id: validId };
    await trailsController.getSingleTrail(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Fetching trail failed.' });
  });
});