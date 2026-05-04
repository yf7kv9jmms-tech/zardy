const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find where image URLs are constructed with rootPath
// Look for patterns like rootPath + path or similar
const idx = c.indexOf('rootPath)+t');
if (idx >= 0) {
  console.log('=== rootPath + path ===');
  console.log(c.substring(Math.max(0, idx-100), idx+200));
}

// Also search for the Image __fromManifest or similar
const idx2 = c.indexOf('Image.__fromManifest');
if (idx2 >= 0) {
  console.log('\n=== Image.__fromManifest ===');
  console.log(c.substring(Math.max(0, idx2-50), idx2+500));
}
