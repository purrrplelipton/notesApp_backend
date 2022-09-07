const { info, error } = require('./logger');

const requestLogger = (req, res, nxt) => {
  info('METHOD', req.method);
  info('PATH', req.path);
  info('BODY', req.body);
  info('---');
  nxt();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ err: 'unknown endpoint' });
};

const errorHandler = (err, req, res, nxt) => {
  error(err);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  nxt(err);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
