const fs = require('fs');
const path = require('path');

function getAllFiles(dir, prefix = '') {
  let results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(getAllFiles(fullPath, prefix + entry.name + '/'));
      } else {
        results.push(prefix + entry.name);
      }
    }
  } catch(e) {}
  return results;
}

const allFiles = getAllFiles('assets/');
const fileSet = new Set(allFiles);

console.log('Total files in assets/:', allFiles.length);
console.log('\nAll files:');
allFiles.sort().forEach(f => console.log('  ' + f));
