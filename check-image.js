const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find __loadImage function
const idx = c.indexOf('__loadImage');
if (idx >= 0) {
  console.log('=== __loadImage ===');
  console.log(c.substring(Math.max(0, idx-50), idx+500));
}

// Also find how image paths are resolved
const idx2 = c.indexOf('loadImage=function');
if (idx2 >= 0) {
  console.log('\n=== loadImage function ===');
  console.log(c.substring(Math.max(0, idx2-100), idx2+500));
}
