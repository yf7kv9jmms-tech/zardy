const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find the __loadLibrary function or similar
const idx = c.indexOf('__loadLibrary');
if (idx >= 0) {
  console.log('=== __loadLibrary ===');
  console.log(c.substring(Math.max(0, idx-50), idx+500));
} else {
  // Try finding how libraries are loaded
  console.log('=== Looking for library loading ===');
  const idx2 = c.indexOf('loadFromFile(t,s)');
  if (idx2 >= 0) {
    console.log(c.substring(Math.max(0, idx2-200), idx2+300));
  }
}
