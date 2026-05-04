const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find __resolveRootPath function
const idx = c.indexOf('__resolveRootPath');
if (idx >= 0) {
  console.log('=== __resolveRootPath context ===');
  console.log(c.substring(Math.max(0, idx-100), idx+500));
}

// Also find how rootPath is applied to asset paths
const idx2 = c.indexOf('.rootPath');
if (idx2 >= 0) {
  console.log('\n=== rootPath usage ===');
  // Find all usages
  let pos = 0;
  while ((pos = c.indexOf('.rootPath', pos)) >= 0) {
    console.log(c.substring(Math.max(0, pos-30), pos+100));
    pos++;
  }
}
