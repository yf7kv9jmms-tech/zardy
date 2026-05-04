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

// Check manifests for referenced files that don't exist
const manifests = ['shared.json', 'songs.json', 'week0.json', 'week1.json', 'week2.json', 'week3.json'];

manifests.forEach(m => {
  try {
    const content = fs.readFileSync(`manifest/${m}`, 'utf8');
    const decoded = decodeURIComponent(content);
    
    // Extract file paths from the manifest
    const paths = decoded.match(/y\d+:assets\/[^y"]+/g);
    if (paths) {
      paths.forEach(p => {
        // Clean up the path (remove leading length prefix like "y40:")
        const cleanPath = p.replace(/^y\d+:/, '');
        if (!fileSet.has(cleanPath)) {
          console.log(`MISSING: ${cleanPath} (from ${m})`);
        }
      });
    }
  } catch(e) {}
});

console.log('\nDone checking.');
