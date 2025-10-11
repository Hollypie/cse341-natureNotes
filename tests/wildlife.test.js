const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { ObjectId } = require('mongodb');
const wildlifeController = require('../controllers/wildlife');

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

describe('Wildlife Endpoints', () => {
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

  const mockWildlifeData = [
    {
      _id: new ObjectId('68e710362e7ccecfab50a132'),
      species: "Mule Deer",
      location: "Rock Canyon, Provo, UT",
      date: "2025-10-01",
      time: "08:30",
      observer: "Holly Briggs",
      count: 3,
      trailId: 5,
    }
  ];

  it('GET /wildlife should return all wildlife items', async () => {
    mockDb.toArray.mockResolvedValue(mockWildlifeData);
    await wildlifeController.getAllSightings(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('wildlife');
    expect(mockDb.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockWildlifeData);
  });

  it('GET /wildlife should handle database errors', async () => {
    mockDb.toArray.mockRejectedValue(new Error('Database error'));
    await wildlifeController.getAllSightings(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Fetching sightings failed.' });
  });

  it('GET /wildlife/:id should return a specific wildlife item', async () => {
    const wildlifeId = '68e710362e7ccecfab50a132';
    const singleWildlife = mockWildlifeData[0];
    
    mockDb.findOne.mockResolvedValue(singleWildlife);
    req.params = { id: wildlifeId };
    
    await wildlifeController.getSingleSighting(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('wildlife');
    expect(mockDb.findOne).toHaveBeenCalledWith({ _id: new ObjectId(wildlifeId) });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(singleWildlife);
  });

  it('GET /wildlife/:id should return 400 for invalid ID format', async () => {
    req.params = { id: 'invalidid' };
    await wildlifeController.getSingleSighting(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid sighting ID format.' });
  });

  it('GET /wildlife/:id should return 404 when sighting not found', async () => {
    const validId = '68e710362e7ccecfab50a132';
    mockDb.findOne.mockResolvedValue(null);

    req.params = { id: validId };
    await wildlifeController.getSingleSighting(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Sighting not found.' });
  });

  it('GET /wildlife/:id should handle database errors', async () => {
    const validId = '68e710362e7ccecfab50a132';
    mockDb.findOne.mockRejectedValue(new Error('Database error'));

    req.params = { id: validId };
    await wildlifeController.getSingleSighting(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Fetching sighting failed.' });
  });
});