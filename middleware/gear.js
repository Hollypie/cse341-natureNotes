const { body, param } = require('express-validator');

const createGearRules = () => {
  return [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isString().withMessage('Name must be a string'),
    body('type')
      .notEmpty().withMessage('Type is required')
      .isString().withMessage('Type must be a string'),
    body('brand')
      .notEmpty().withMessage('Brand is required')
      .isString().withMessage('Brand must be a string'),
    body('weightOz')
      .notEmpty().withMessage('Weight in oz is required')
      .toFloat()
      .isNumeric().withMessage('Weight must be a number'),
    body('category')
      .notEmpty().withMessage('Category is required')
      .isString().withMessage('Category must be a string'),
    body('condition')
      .notEmpty().withMessage('Condition is required')
      .isString().withMessage('Condition must be a string'),
    body('owner')
      .notEmpty().withMessage('Owner is required')
      .isString().withMessage('Owner must be a string'),
    body('purchaseDate')
      .notEmpty().withMessage('Purchase Date is required')
          .isString().withMessage('Purchase date must be a string'),
    body('favorite')
      .notEmpty().withMessage('Favorite is required')
      .toBoolean()
      .isBoolean().withMessage('Favorite must be a boolean (true or false)'),
    body('notes')
      .notEmpty().withMessage('notes is required')
      .isString().withMessage('Notes must be a string')
  ];
};

const updateGearRules = () => {
  return [
    body('name')
      .optional()
      .isString().withMessage('Name must be a string'),
    body('type')
      .optional()
      .isString().withMessage('Type must be a string'),
    body('brand')
      .optional()
      .isString().withMessage('Brand must be a string'),
    body('weightOz')
      .optional()
      .toFloat()
      .isNumeric().withMessage('Weight must be a number'),
    body('category')
      .optional()
      .isString().withMessage('Category must be a string'),
    body('condition')
      .optional()
      .isString().withMessage('Condition must be a string'),
    body('owner')
      .optional()
      .isString().withMessage('Owner must be a string'),
    body('purchaseDate')
      .optional()
      .isString().withMessage('Purchase date must be a string'),
    body('favorite')
      .optional()
      .toBoolean()
      .isBoolean().withMessage('Favorite must be a boolean (true or false)'),
    body('notes')
      .optional()
      .isString().withMessage('Notes must be a string')
  ];
};

const gearIdParamRules = () => {
  return [
    param('id')
      .notEmpty().withMessage('Gear ID is required')
      .isMongoId().withMessage('Invalid gear ID format')
  ];
};

module.exports = {
  createGearRules,
  updateGearRules,
  gearIdParamRules
};