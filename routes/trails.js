const express = require('express');
const router = express.Router();
const trailsController = require('../controllers/trails');
const { createTrailRules, updateTrailRules, trailIdParamRules } = require('../middleware/trails.js');
const { validate } = require('../middleware/validator.js');
const authMiddleware = require('../middleware/auth');

/**
 * GET all trails
 */
router.get('/', (req, res, next) => {
    /*
        #swagger.tags = ['Trails']
        #swagger.description = 'Get all trails.'
        #swagger.path = '/trails'
        #swagger.method = 'get'
        #swagger.responses[200] = {
            description: 'Array of trails returned successfully',
            schema: [{ $ref: "#/definitions/Trail" }]
        }
        #swagger.responses[500] = { description: 'Internal server error' } 
    */
    return trailsController.getAllTrails(req, res, next);
});

/**
 * GET a single trail by ID
 */
router.get('/:id', trailIdParamRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Trails']
        #swagger.description = 'Get a single trail by its ID.'
        #swagger.parameters['id'] = { description: 'Trail ID', required: true, type: 'string' }
        #swagger.responses[200] = { description: 'Trail found', schema: { $ref: "#/definitions/Trail" } }
        #swagger.responses[400] = { description: 'Invalid ID format' }
        #swagger.responses[404] = { description: 'Trail not found' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return trailsController.getSingleTrail
});

/**
 * POST create a new trail
 */
router.post('/', authMiddleware, createTrailRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Trails']
        #swagger.description = 'Create a new trail.'
        #swagger.path = '/trails'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Trail information',
            required: true,
            schema: { $ref: "#/definitions/Trail" }
        }
        #swagger.responses[201] = { description: 'Trail created successfully' }
        #swagger.responses[400] = { description: 'Invalid request data' }
        #swagger.responses[401] = { description: 'Unauthorized' }
        #swagger.responses[422] = { description: 'Validation error' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return trailsController.createTrail(req, res, next);
});

/**
 * PUT update a trail by ID
 */
router.put('/:id', authMiddleware, trailIdParamRules(), updateTrailRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Trails']
        #swagger.description = 'Update an existing trail.'
        #swagger.parameters['id'] = { description: 'Trail ID', required: true, type: 'string' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated trail information',
            required: true,
            schema: { $ref: "#/definitions/Trail" }
        }
        #swagger.responses[200] = { description: 'Trail updated successfully' }
        #swagger.responses[400] = { description: 'Invalid ID or missing fields' }
        #swagger.responses[401] = { description: 'Unauthorized' }
        #swagger.responses[404] = { description: 'Trail not found' }
        #swagger.responses[422] = { description: 'Validation error' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return trailsController.updateTrail(req, res, next);
});

/**
 * DELETE a trail by ID
 */
router.delete('/:id', authMiddleware, trailIdParamRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Trails']
        #swagger.description = 'Delete a trail by its ID.'
        #swagger.parameters['id'] = { description: 'Trail ID', required: true, type: 'string' }
        #swagger.responses[204] = { description: 'Trail deleted successfully' }
        #swagger.responses[400] = { description: 'Invalid ID format' }
        #swagger.responses[401] = { description: 'Unauthorized' }
        #swagger.responses[404] = { description: 'Trail not found' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return trailsController.deleteTrail(req, res, next);
});

module.exports = router;
