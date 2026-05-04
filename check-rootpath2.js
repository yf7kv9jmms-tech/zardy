const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find how rootPath is used when loading assets from a library
const idx = c.indexOf('s.rootPath=null==s.rootPath');
if (idx >= 0) {
  console.log('=== rootPath assignment ===');
  console.log(c.substring(Math.max(0, idx-200), idx+300));
}

// Find where assets are loaded with rootPath
const idx2 = c.indexOf('rootPath",t);');
if (idx2 >= 0) {
  console.log('\n=== rootPath usage in fromManifest ===');
  console.log(c.substring(Math.max(0, idx2-100), idx2+100));
}
