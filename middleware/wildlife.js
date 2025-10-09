const { body, param } = require('express-validator');

const createWildlifeRules = () => {
  return [
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
      .isInt({ min: 1 }).withMessage('Count must be a positive integer'),
    body('trailId')
      .notEmpty().withMessage('Trail ID is required')
      .isInt({ min: 1 }).withMessage('Trail ID must be a positive integer'),
  ];
};

const updateWildlifeRules = () => {
  return [
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
      .isInt({ min: 1 }).withMessage('Count must be a positive integer'),
    body('trailId')
      .optional()
      .isInt({ min: 1 }).withMessage('Trail ID must be a positive integer'),
  ];
};

const wildlifeIdParamRules = () => {
  return [
    param('id')
      .notEmpty().withMessage('Wildlife ID is required')
      .isMongoId().withMessage('Invalid Wildlife ID format'),
  ];
};

module.exports = {
  createWildlifeRules,
  updateWildlifeRules,
  wildlifeIdParamRules,
};
