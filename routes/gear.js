const express = require('express');
const router = express.Router();
const gearController = require('../controllers/gear');
const { createGearRules, updateGearRules, gearIdParamRules } = require('../middleware/gear.js');
const { validate } = require('../middleware/validator.js');
const authMiddleware = require('../middleware/auth');

/**
 * GET all gear
 */
// #swagger.tags = ['Gear']
// #swagger.description = 'Get all gear.'
// #swagger.responses[200] = {
//     description: 'Array of gear returned successfully',
//     schema: [{ $ref: "#/definitions/Gear" }]
// }
// #swagger.responses[500] = { description: 'Internal server error' }
router.get('/', gearController.getAllGear);

/**
 * GET a single gear by ID
 */
// #swagger.tags = ['Gear']
// #swagger.description = 'Get a single gear by its ID.'
// #swagger.parameters['id'] = { description: 'Gear ID', required: true, type: 'string' }
// #swagger.responses[200] = { description: 'Gear found', schema: { $ref: "#/definitions/Gear" } }
// #swagger.responses[400] = { description: 'Invalid ID format' }
// #swagger.responses[404] = { description: 'Gear not found' }
// #swagger.responses[500] = { description: 'Internal server error' }
router.get('/:id', gearIdParamRules(), validate, gearController.getSingleGear);

/**
 * POST create a new gear
 */
// #swagger.tags = ['Gear']
// #swagger.description = 'Create a new gear.'
// #swagger.parameters['body'] = {
//     in: 'body',
//     description: 'Gear information',
//     required: true,
//     schema: { $ref: "#/definitions/Gear" }
// }
// #swagger.responses[201] = { description: 'Gear created successfully' }
// #swagger.responses[400] = { description: 'Invalid request data' }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[422] = { description: 'Validation error' }
// #swagger.responses[500] = { description: 'Internal server error' }
router.post('/', authMiddleware, createGearRules(), validate, gearController.createGear);

/**
 * PUT update a gear by ID
 */
// #swagger.tags = ['Gear']
// #swagger.description = 'Update an existing gear.'
// #swagger.parameters['id'] = { description: 'Gear ID', required: true, type: 'string' }
// #swagger.parameters['body'] = {
//     in: 'body',
//     description: 'Updated gear information',
//     required: true,
//     schema: { $ref: "#/definitions/Gear" }
// }
// #swagger.responses[200] = { description: 'Gear updated successfully' }
// #swagger.responses[400] = { description: 'Invalid ID or missing fields' }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[404] = { description: 'Gear not found' }
// #swagger.responses[422] = { description: 'Validation error' }
// #swagger.responses[500] = { description: 'Internal server error' }
router.put('/:id', authMiddleware, gearIdParamRules(), updateGearRules(), validate, gearController.updateGear);

/**
 * DELETE a gear by ID
 */
// #swagger.tags = ['Gear']
// #swagger.description = 'Delete a gear by its ID.'
// #swagger.parameters['id'] = { description: 'Gear ID', required: true, type: 'string' }
// #swagger.responses[204] = { description: 'Gear deleted successfully' }
// #swagger.responses[400] = { description: 'Invalid ID format' }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[404] = { description: 'Gear not found' }
// #swagger.responses[500] = { description: 'Internal server error' }
router.delete('/:id', authMiddleware, gearIdParamRules(), validate, gearController.deleteGear);

module.exports = router;
