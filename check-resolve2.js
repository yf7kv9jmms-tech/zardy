const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find the full __resolvePath function in AssetLibrary
const idx = c.indexOf('__resolvePath:function(t){var e=(t=Y.replace');
if (idx >= 0) {
  console.log('=== AssetLibrary.__resolvePath ===');
  // Find the end of the function
  let braceCount = 0;
  let started = false;
  for (let i = idx; i < c.length; i++) {
    if (c[i] === '{') {
      braceCount++;
      started = true;
    }
    if (c[i] === '}') {
      braceCount--;
      if (started && braceCount === 0) {
        console.log(c.substring(idx, i + 1));
        break;
      }
    }
  }
}
