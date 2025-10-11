const express = require('express');
const router = express.Router();
const hikersController = require('../controllers/hikers');
const { createHikerRules, updateHikerRules, hikerIdParamRules } = require('../middleware/hikers.js');
const { validate } = require('../middleware/validator.js');
const authMiddleware = require('../middleware/auth');

/**
 * GET all hikers
 */
router.get('/', (req, res, next) => {
    /*
        #swagger.tags = ['Hikers']
        #swagger.description = 'Get all hikers.'
        #swagger.path = '/hikers'
        #swagger.responses[200] = {
            description: 'Array of hikers returned successfully',
            schema: [{ $ref: "#/definitions/Hiker" }]
        }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return hikersController.getAllHikers(req, res, next);
});

/**
 * GET a single hiker by ID
 */
router.get('/:id', hikerIdParamRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Hikers']
        #swagger.description = 'Get a single hiker by its ID.'
        #swagger.parameters['id'] = { description: 'Hiker ID', required: true, type: 'string' }
        #swagger.responses[200] = { description: 'Hiker found', schema: { $ref: "#/definitions/Hiker" } }
        #swagger.responses[400] = { description: 'Invalid ID format' }
        #swagger.responses[404] = { description: 'Hiker not found' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return hikersController.getSingleHiker(req, res, next);
});

/**
 * POST create a new hiker
 */
router.post('/', authMiddleware, createHikerRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Hikers']
        #swagger.description = 'Create a new hiker.'
        #swagger.path = '/hikers'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Hiker information',
            required: true,
            schema: { $ref: "#/definitions/Hiker" }
        }
        #swagger.responses[201] = { description: 'Hiker created successfully' }
        #swagger.responses[400] = { description: 'Invalid request data' }
        #swagger.responses[401] = { description: 'Unauthorized' }
        #swagger.responses[422] = { description: 'Validation error' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return hikersController.createHiker(req, res, next);
});

/**
 * PUT update a hiker by ID
 */
router.put('/:id', authMiddleware, hikerIdParamRules(), updateHikerRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Hikers']
        #swagger.description = 'Update an existing hiker.'
        #swagger.parameters['id'] = { description: 'Hiker ID', required: true, type: 'string' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated hiker information',
            required: true,
            schema: { $ref: "#/definitions/Hiker" }
        }
        #swagger.responses[200] = { description: 'Hiker updated successfully' }
        #swagger.responses[400] = { description: 'Invalid ID or missing fields' }
        #swagger.responses[401] = { description: 'Unauthorized' }
        #swagger.responses[404] = { description: 'Hiker not found' }
        #swagger.responses[422] = { description: 'Validation error' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return hikersController.updateHiker(req, res, next);
});

/**
 * DELETE a hiker by ID
 */
router.delete('/:id', authMiddleware, hikerIdParamRules(), validate, (req, res, next) => {
    /*
        #swagger.tags = ['Hikers']
        #swagger.description = 'Delete a hiker by its ID.'
        #swagger.parameters['id'] = { description: 'Hiker ID', required: true, type: 'string' }
        #swagger.responses[204] = { description: 'Hiker deleted successfully' }
        #swagger.responses[400] = { description: 'Invalid ID format' }
        #swagger.responses[401] = { description: 'Unauthorized' }
        #swagger.responses[404] = { description: 'Hiker not found' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
    return hikersController.deleteHiker(req, res, next);
});

module.exports = router;
