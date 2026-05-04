const fs = require('fs');

const cur = fs.readFileSync('Funkin.js', 'utf8');
const orig = fs.readFileSync('fnf.run3.io/fnf.run3.io/zardy-foolhardy-pack/1/Funkin.js', 'utf8');

// Find the embedded manifest in original
const origIdx = orig.indexOf('"rootPath":null,"version":2');
if (origIdx >= 0) {
  console.log('=== Original embedded manifest ===');
  // Find the start of the JSON
  let start = origIdx;
  while (start > 0 && orig[start] !== '{') start--;
  const end = orig.indexOf('}', origIdx) + 1;
  console.log(orig.substring(start, Math.min(end + 50, orig.length)));
}

// Find the equivalent in current
const curIdx = cur.indexOf('"rootPath":null,"version":2');
if (curIdx >= 0) {
  console.log('\n=== Current embedded manifest ===');
  let start = curIdx;
  while (start > 0 && cur[start] !== '{') start--;
  const end = cur.indexOf('}', curIdx) + 1;
  console.log(cur.substring(start, Math.min(end + 50, cur.length)));
} else {
  console.log('\n=== Current: No embedded manifest found ===');
}

// Check for default library registration
console.log('\n=== Original: default library pattern ===');
const origDefIdx = orig.indexOf('registerLibrary("default"');
if (origDefIdx >= 0) {
  console.log(orig.substring(Math.max(0, origDefIdx-300), origDefIdx+200));
}

console.log('\n=== Current: default library pattern ===');
const curDefIdx = cur.indexOf('registerLibrary("default"');
if (curDefIdx >= 0) {
  console.log(cur.substring(Math.max(0, curDefIdx-300), curDefIdx+200));
}
