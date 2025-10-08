const { body, param } = require('express-validator');

const createWildlifeRules = () => {
  return [
    body('sightingId')
      .notEmpty().withMessage('Sighting ID is required')
      .isNumeric().withMessage('Sighting ID must be a number'),
    body('species')
      .notEmpty().withMessage('Species is required')
      .isString().withMessage('Species must be a string'),
    body('location')
      .notEmpty().withMessage('Location is required')
      .isString().withMessage('Location must be a string'),
    body('date')
      .notEmpty().withMessage('Date is required')
      .isString().withMessage('Date must be a string'),
    body('time')
      .notEmpty().withMessage('Time is required')
      .isString().withMessage('Time must be a string'),
    body('observer')
      .notEmpty().withMessage('Observer is required')
      .isString().withMessage('Observer must be a string'),
    body('count')
      .notEmpty().withMessage('Count is required')
          .isNumeric().withMessage('Count must be a Number'),
    body('trailID')
      .notEmpty().withMessage('Trail ID is required')
      .isNumeric().withMessage('Trail ID must be a Number'),
  ];
};

const updateWildlifeRules = () => {
  return [
    body('sightingId')
      .optional()
      .isNumeric().withMessage('Sighting ID must be a number'),
    body('species')
      .optional()
      .isString().withMessage('Species must be a string'),
    body('location')
      .optional()
      .isString().withMessage('Location must be a string'),
    body('date')
      .optional()
      .isString().withMessage('Date must be a string'),
    body('time')
      .optional()
      .isString().withMessage('Time must be a string'),
    body('observer')
      .optional()
      .isString().withMessage('Observer must be a string'),
    body('count')
      .optional()
      .isNumeric().withMessage('Count must be a Number'),
    body('trailID')
      .optional()
      .isNumeric().withMessage('Trail ID must be a Number'),
  ];
};

const wildlifeIdParamRules = () => {
  return [
    param('id')
      .notEmpty().withMessage('Wildlife ID is required')
      .isMongoId().withMessage('Invalid Wildlife ID format')
  ];
};

module.exports = {
  createWildlifeRules,
  updateWildlifeRules,
  wildlifeIdParamRules
};