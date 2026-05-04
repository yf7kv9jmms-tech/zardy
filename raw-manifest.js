const fs = require('fs');
const content = fs.readFileSync('manifest/shared.json', 'utf8');
console.log('Raw manifest (first 500 chars):');
console.log(content.substring(0, 500));
