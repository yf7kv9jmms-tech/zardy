const fs = require('fs');
const path = require('path');

function listFiles(dir, prefix = '') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(listFiles(fullPath, prefix + entry.name + '/'));
    } else {
      results.push(prefix + entry.name);
    }
  }
  return results;
}

// List assets in current deployment
console.log('=== Current deployment assets/shared/images/ ===');
const currentShared = listFiles('assets/shared/images/');
currentShared.forEach(f => console.log(f));

console.log('\n=== Current deployment assets/week3/images/ ===');
const currentWeek3 = listFiles('assets/week3/images/');
currentWeek3.forEach(f => console.log(f));

console.log('\n=== Original assets/shared/images/ ===');
const origShared = listFiles('fnf.run3.io/fnf.run3.io/zardy-foolhardy-pack/1/assets/shared/images/');
origShared.forEach(f => console.log(f));

// Compare
console.log('\n=== Files in original shared but NOT in current ===');
const currentSet = new Set(currentShared);
origShared.filter(f => !currentSet.has(f)).forEach(f => console.log(f));

console.log('\n=== Files in current shared but NOT in original ===');
const origSet = new Set(origShared);
currentShared.filter(f => !origSet.has(f)).forEach(f => console.log(f));
