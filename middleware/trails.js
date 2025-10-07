const { body, param } = require('express-validator');

const createTrailRules = () => {
  return [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isString().withMessage('Name must be a string'),
    body('location')
      .notEmpty().withMessage('Location is required')
      .isString().withMessage('Location must be a string'),
    body('distance_miles')
      .notEmpty().withMessage('Distance is required')
      .isFloat({ min: 0 }).withMessage('Distance must be a positive number'),
    body('difficulty')
      .notEmpty().withMessage('Difficulty is required')
      .isIn(['Easy', 'Moderate', 'Hard', 'Expert']).withMessage('Invalid difficulty level'),
    body('type')
      .notEmpty().withMessage('Type is required')
      .isString().withMessage('Type must be a string'),
    body('elevation_gain_ft')
      .notEmpty().withMessage('Elevation gain is required')
      .isNumeric().withMessage('Elevation gain must be a number'),
    body('rating')
      .optional()
      .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5')
  ];
};

const updateTrailRules = () => {
  return [
    body('name')
      .optional()
      .isString().withMessage('Name must be a string'),
    body('location')
      .optional()
      .isString().withMessage('Location must be a string'),
    body('distance_miles')
      .optional()
      .isFloat({ min: 0 }).withMessage('Distance must be a positive number'),
    body('difficulty')
      .optional()
      .isIn(['Easy', 'Moderate', 'Hard', 'Expert']).withMessage('Invalid difficulty level'),
    body('type')
      .optional()
      .isString().withMessage('Type must be a string'),
    body('elevation_gain_ft')
      .optional()
      .isNumeric().withMessage('Elevation gain must be a number'),
    body('rating')
      .optional()
      .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5')
  ];
};

const trailIdParamRules = () => {
  return [
    param('id')
      .notEmpty().withMessage('Trail ID is required')
      .isMongoId().withMessage('Invalid Trail ID format')
  ];
};

module.exports = {
  createTrailRules,
  updateTrailRules,
  trailIdParamRules
};