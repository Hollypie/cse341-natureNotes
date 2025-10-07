const { body, param } = require('express-validator')

const createTrailRules = () => {
  return [
    body('sightingId').isInt(),
    body('species').isString(),
    body('location').isString(), 
    body('date').isString(),
    body('time').isString(),
    body('observer').isString(),
    body('count').isInt(),
    body('trailId').isInt(),
  ]
}

const updateTrailRules = () => {
  return [
    body('sightingId').optional().isInt(),
    body('species').optional().isString(),
    body('location').optional().isString(), 
    body('date').optional().isString(),
    body('time').optional().isString(),
    body('observer').optional().isString(),
    body('count').optional().isInt(),
    body('trailId').optional().isInt(),
  ]
}

const trailIdParamRules = () => [
    param('id').isMongoId().withMessage('Invalid trail ID'),
];

module.exports = {
    createTrailRules,
    updateTrailRules,
    trailIdParamRules
}