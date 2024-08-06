const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

function getEnvVar(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

module.exports = { getEnvVar };