const { validationResult } = require('express-validator');

const handleValidationError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const handleNotFound = (req, res, next) => {
  return res.status(404).json({ error: 'Recurso no encontrado' });
};

const handleError = (error, req, res, next) => {
  console.error(error.stack);
  return res.status(500).json({ error: 'Error interno del servidor' });
};

module.exports = { handleValidationError, handleNotFound, handleError };
