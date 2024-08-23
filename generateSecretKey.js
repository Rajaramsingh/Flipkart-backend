const crypto = require('crypto');

// Generate a random 64-byte string and convert it to hexadecimal
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated JWT Secret Key:');
console.log(secretKey);
