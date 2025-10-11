const express = require('express');
const router = express.Router();
const wildlifeController = require('../controllers/wildlife');
const { createWildlifeRules, updateWildlifeRules, wildlifeIdParamRules } = require('../middleware/wildlife.js');
const { validate } = require('../middleware/validator.js');
const authMiddleware = require('../middleware/auth');

/**
 * GET all wildlife sightings
 */
router.get('/', (req, res, next) => {
    /*
        #swagger.tags = ['Wildlife']
        #swagger.description = 'Get all wildlife sightings.'
        #swagger.path = '/wildlife'
        #swagger.responses[200] = {
            description: 'Array of wildlife sightings returned successfully',
            schema: [{ $ref: "#/definitions/WildlifeSighting" }]
        }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return wildlifeController.getAllSightings(req, res, next);
});

/**
 * GET a single wildlife sighting by ID
 */
router.get('/:id', wildlifeIdParamRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Wildlife']
        #swagger.description = 'Get a single wildlife sighting by its ID.'
        #swagger.parameters['id'] = { description: 'Sighting ID', required: true, type: 'string' }
        #swagger.responses[200] = { description: 'Sighting found', schema: { $ref: "#/definitions/WildlifeSighting" } }
        #swagger.responses[400] = { description: 'Invalid ID format' }
        #swagger.responses[404] = { description: 'Sighting not found' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return wildlifeController.getSingleSighting(req, res, next);
});

/**
 * POST create a new wildlife sighting
 */
router.post('/', authMiddleware, createWildlifeRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Wildlife']
        #swagger.description = 'Create a new wildlife sighting.'
        #swagger.path = '/wildlife'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Wildlife sighting information',
            required: true,
            schema: { $ref: "#/definitions/WildlifeSighting" }
        }
        #swagger.responses[201] = { description: 'Sighting created successfully' }
        #swagger.responses[400] = { description: 'Invalid request data' }
        #swagger.responses[401] = { description: 'Unauthorized' }
        #swagger.responses[422] = { description: 'Validation error' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return wildlifeController.createSighting(req, res, next);
});

/**
 * PUT update a wildlife sighting by ID
 */
router.put('/:id', authMiddleware, wildlifeIdParamRules(), updateWildlifeRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Wildlife']
        #swagger.description = 'Update an existing wildlife sighting.'
        #swagger.parameters['id'] = { description: 'Sighting ID', required: true, type: 'string' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated wildlife sighting information',
            required: true,
            schema: { $ref: "#/definitions/WildlifeSighting" }
        }
        #swagger.responses[200] = { description: 'Sighting updated successfully' }
        #swagger.responses[400] = { description: 'Invalid ID or missing fields' }
        #swagger.responses[401] = { description: 'Unauthorized' }
        #swagger.responses[404] = { description: 'Sighting not found' }
        #swagger.responses[422] = { description: 'Validation error' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return wildlifeController.updateSighting(req, res, next);
});
// router.put('/:id', requireAuth, wildlifeIdParamRules(), updateWildlifeRules(), validate, wildlifeController.updateSighting);

/**
 * DELETE a wildlife sighting by ID
 */
router.delete('/:id', authMiddleware, wildlifeIdParamRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Wildlife']
        #swagger.description = 'Delete a wildlife sighting by its ID.'
        #swagger.parameters['id'] = { description: 'Sighting ID', required: true, type: 'string' }
        #swagger.responses[204] = { description: 'Sighting deleted successfully' }
        #swagger.responses[400] = { description: 'Invalid ID format' }
        #swagger.responses[401] = { description: 'Unauthorized' }
        #swagger.responses[404] = { description: 'Sighting not found' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return wildlifeController.deleteSighting(req, res, next);
});
// router.delete('/:id', requireAuth, wildlifeIdParamRules(), validate, wildlifeController.deleteSighting);

module.exports = router;
