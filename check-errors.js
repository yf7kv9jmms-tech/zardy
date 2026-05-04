const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find error handling for manifest loading
const patterns = [
  'Cannot parse asset manifest',
  'Cannot open library',
  'no asset library',
  'onError',
  'libraryPaths.h'
];

patterns.forEach(p => {
  let idx = 0;
  let count = 0;
  while ((idx = c.indexOf(p, idx)) >= 0) {
    if (count < 2) {
      console.log(`\n=== Found '${p}' (occurrence ${count + 1}) ===`);
      console.log(c.substring(Math.max(0, idx-100), idx+200));
    }
    idx++;
    count++;
  }
  console.log(`\nTotal occurrences of '${p}': ${count}`);
});
