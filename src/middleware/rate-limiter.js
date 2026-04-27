const rateLimit = require("express-rate-limit");

const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    message: "Too many requests. Please try again later",
    response: []
  }
});

module.exports = publicLimiter;