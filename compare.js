const fs = require('fs');
const c1 = fs.readFileSync('Funkin.js', 'utf8');
const c2 = fs.readFileSync('fnf.run3.io/fnf.run3.io/zardy-foolhardy-pack/1/Funkin.js', 'utf8');

// Find shared.json references in original
let idx1 = c1.indexOf('shared.json');
let idx2 = c2.indexOf('shared.json');

console.log('=== Current Funkin.js around shared.json ===');
console.log(c1.substring(Math.max(0, idx1-200), idx1+200));

console.log('\n=== Original Funkin.js around shared.json ===');
if (idx2 >= 0) {
  console.log(c2.substring(Math.max(0, idx2-200), idx2+200));
} else {
  console.log('NOT FOUND');
}

// Check for manifest loading pattern differences
console.log('\n=== Current: rootPath pattern ===');
const rpIdx1 = c1.indexOf('de.rootPath');
if (rpIdx1 >= 0) {
  console.log(c1.substring(Math.max(0, rpIdx1-50), rpIdx1+500));
}

console.log('\n=== Original: rootPath pattern ===');
const rpIdx2 = c2.indexOf('de.rootPath');
if (rpIdx2 >= 0) {
  console.log(c2.substring(Math.max(0, rpIdx2-50), rpIdx2+500));
} else {
  console.log('NOT FOUND');
}
