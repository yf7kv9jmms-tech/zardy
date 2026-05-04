const fs = require('fs');

const orig = fs.readFileSync('fnf.run3.io/fnf.run3.io/zardy-foolhardy-pack/1/Funkin.js', 'utf8');

// Check how external manifests are loaded in original
const idx = orig.indexOf('libraryPaths.h.songs');
if (idx >= 0) {
  console.log('=== Original: libraryPaths code ===');
  console.log(orig.substring(Math.max(0, idx-200), idx+600));
}
