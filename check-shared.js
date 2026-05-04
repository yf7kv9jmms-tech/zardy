const fs = require('fs');

// Decode and check shared.json
const raw = fs.readFileSync('manifest/shared.json', 'utf8');
const decoded = decodeURIComponent(raw);

console.log('=== Decoded shared.json ===');
console.log(decoded.substring(0, 5000));
