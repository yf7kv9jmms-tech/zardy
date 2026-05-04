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

// Parse manifest format more carefully
function extractPaths(decoded) {
  const paths = [];
  // Pattern: y{length}:pathy{length}:{filepath}
  // The filepath ends when we hit 'y{digit}:size' or 'y{digit}:type' or end of asset entry
  const regex = /pathy\d+:([^y]+(?:y(?!\d+:size|y\d+:type)[^y]*)*)/g;
  let match;
  while ((match = regex.exec(decoded)) !== null) {
    let filePath = match[1];
    // Clean up trailing serialization artifacts
    filePath = filePath.replace(/y\d+:(?:size|type|id|preload)[^y]*/g, '');
    filePath = filePath.replace(/R\d+[^y]*/g, '');
    filePath = filePath.replace(/tgoR\d+$/g, '');
    filePath = filePath.trim();
    if (filePath && filePath.startsWith('assets/')) {
      paths.push(filePath);
    }
  }
  return paths;
}

const manifests = ['shared.json', 'songs.json', 'week0.json', 'week1.json', 'week2.json', 'week3.json'];
let missingCount = 0;

manifests.forEach(m => {
  try {
    const content = fs.readFileSync(`manifest/${m}`, 'utf8');
    const decoded = decodeURIComponent(content);
    
    const paths = extractPaths(decoded);
    
    paths.forEach(p => {
      if (!fileSet.has(p)) {
        console.log(`MISSING: ${p} (from ${m})`);
        missingCount++;
      }
    });
  } catch(e) {
    console.log(`${m}: ERROR - ${e.message}`);
  }
});

console.log(`\nTotal missing: ${missingCount}`);
