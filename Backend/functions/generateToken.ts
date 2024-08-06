const { randomBytes } = require("crypto");

// Generate a random 32-byte string in hexadecimal format
const randomString = randomBytes(32).toString("hex");

console.log(randomString);