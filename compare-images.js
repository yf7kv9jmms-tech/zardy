const fs = require('fs');
const path = require('path');

function listFiles(dir, prefix = '') {
  let results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(listFiles(fullPath, prefix + entry.name + '/'));
      } else {
        results.push(prefix + entry.name);
      }
    }
  } catch(e) {
    // directory doesn't exist
  }
  return results;
}

// Check for storymenu and week-related files
console.log('=== Current: assets/images/storymenu/ ===');
const curStory = listFiles('assets/images/storymenu/');
curStory.forEach(f => console.log(f));

console.log('\n=== Original: assets/images/storymenu/ ===');
const origStory = listFiles('fnf.run3.io/fnf.run3.io/zardy-foolhardy-pack/1/assets/images/storymenu/');
origStory.forEach(f => console.log(f));

console.log('\n=== Current: assets/images/ ===');
const curImages = listFiles('assets/images/');
curImages.forEach(f => console.log(f));

console.log('\n=== Original: assets/images/ ===');
const origImages = listFiles('fnf.run3.io/fnf.run3.io/zardy-foolhardy-pack/1/assets/images/');
origImages.forEach(f => console.log(f));
