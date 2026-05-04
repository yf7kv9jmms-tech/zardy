const fs = require('fs');

const cur = fs.readFileSync('Funkin.js', 'utf8');
const orig = fs.readFileSync('fnf.run3.io/fnf.run3.io/zardy-foolhardy-pack/1/Funkin.js', 'utf8');

console.log('Current Funkin.js length:', cur.length);
console.log('Original Funkin.js length:', orig.length);

// Find differences by comparing sections
// Let's find where they differ
let diffStart = 0;
for (let i = 0; i < Math.min(cur.length, orig.length); i++) {
  if (cur[i] !== orig[i]) {
    diffStart = i;
    break;
  }
}

if (diffStart > 0) {
  console.log('\n=== First difference at position:', diffStart);
  console.log('Context from current:');
  console.log(cur.substring(Math.max(0, diffStart - 100), diffStart + 200));
  console.log('\nContext from original:');
  console.log(orig.substring(Math.max(0, diffStart - 100), diffStart + 200));
} else if (cur.length !== orig.length) {
  console.log('\nFiles differ in length but content matches up to', Math.min(cur.length, orig.length));
} else {
  console.log('\nFiles are identical!');
}
