const fs = require('fs');

const c = fs.readFileSync('fnf.run3.io/fnf.run3.io/zardy-foolhardy-pack/1/Funkin.js', 'utf8');

// Check for library paths or asset loading
const patterns = [
  'libraryPaths',
  'preloadLibraries',
  'Ca.libraryPaths',
  'manifest',
  'rootPath',
  'libraryType'
];

patterns.forEach(p => {
  const idx = c.indexOf(p);
  if (idx >= 0) {
    console.log(`\n=== Found '${p}' ===`);
    console.log(c.substring(Math.max(0, idx-50), idx+300));
  } else {
    console.log(`\n=== '${p}' NOT FOUND ===`);
  }
});
