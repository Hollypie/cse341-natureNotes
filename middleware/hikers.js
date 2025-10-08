const { body, param } = require('express-validator');

const createHikerRules = () => {
  return [
    body('firstName')
      .notEmpty().withMessage('First name is required')
      .isString().withMessage('First name must be a string'),

    body('lastName')
      .notEmpty().withMessage('Last name is required')
      .isString().withMessage('Last name must be a string'),

    body('username')
      .notEmpty().withMessage('Username is required')
      .isString().withMessage('Username must be a string'),

    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email'),

    body('location')
      .notEmpty().withMessage('Location is required')
      .isString().withMessage('Location must be a string'),

    body('memberSince')
      .notEmpty().withMessage('Member Since is required')
      .isString().withMessage('Member since must be a string'),

    body('isAdmin')
      .notEmpty().withMessage('isAdmin is required')
      .isBoolean().withMessage('isAdmin must be a boolean (true or false)'),

    body('trailCount')
      .optional()
      .isInt({ min: 0 }).withMessage('Trail count must be a positive integer'),

    body('bio')
      .optional()
      .isString().withMessage('Bio must be a string'),
  ];
};

const updateHikerRules = () => {
  return [
    body('firstName')
      .optional()
      .isString().withMessage('First name must be a string'),

    body('lastName')
      .optional()
      .isString().withMessage('Last name must be a string'),

    body('username')
      .optional()
      .isString().withMessage('Username must be a string'),

    body('email')
      .optional()
      .isEmail().withMessage('Must be a valid email'),

    body('location')
      .optional()
      .isString().withMessage('Location must be a string'),

    body('memberSince')
      .optional()
      .isString().withMessage('Member since must be a string'),

    body('isAdmin')
      .optional()
      .isBoolean().withMessage('isAdmin must be a boolean (true or false)'),

    body('trailCount')
      .optional()
      .isInt({ min: 0 }).withMessage('Trail count must be a positive integer'),

    body('bio')
      .optional()
      .isString().withMessage('Bio must be a string'),
  ];
};

const hikerIdParamRules = () => {
  return [
    param('id')
      .notEmpty().withMessage('Hiker ID is required')
      .isMongoId().withMessage('Invalid Hiker ID format'),
  ];
};

module.exports = {
  createHikerRules,
  updateHikerRules,
  hikerIdParamRules,
};
