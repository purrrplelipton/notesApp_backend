const info = (...args) =>
  process.env.NODE_ENV === 'test' ? null : console.log(...args)

const error = (...args) =>
  process.env.NODE_ENV === 'test' ? null : console.error(...args)

module.exports = { info, error }
