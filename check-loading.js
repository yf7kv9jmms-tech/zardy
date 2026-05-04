const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find the AssetLibrary load method
const patterns = [
  'loadLibrary',
  '__loadLibrary',
  'libraryPaths.h',
  'getAsset'
];

patterns.forEach(p => {
  let idx = 0;
  let count = 0;
  while ((idx = c.indexOf(p, idx)) >= 0) {
    if (count < 3) {
      console.log(`\n=== Found '${p}' (occurrence ${count + 1}) ===`);
      console.log(c.substring(Math.max(0, idx-100), idx+300));
    }
    idx++;
    count++;
  }
});
