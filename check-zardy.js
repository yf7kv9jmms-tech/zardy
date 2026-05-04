const fs = require('fs');

const cur = fs.readFileSync('Funkin.js', 'utf8');
const orig = fs.readFileSync('fnf.run3.io/fnf.run3.io/zardy-foolhardy-pack/1/Funkin.js', 'utf8');

// Find how Zardy character is loaded
const zardyPattern = /case\s*"zardy"|Zardy|zardy/gi;

console.log('=== Zardy references in CURRENT Funkin.js ===');
let match;
while ((match = zardyPattern.exec(cur)) !== null) {
  const start = Math.max(0, match.index - 100);
  const end = Math.min(cur.length, match.index + 200);
  console.log(`Position ${match.index}: ${cur.substring(start, end)}`);
  console.log();
}

console.log('\n=== Zardy references in ORIGINAL Funkin.js ===');
zardyPattern.lastIndex = 0;
while ((match = zardyPattern.exec(orig)) !== null) {
  const start = Math.max(0, match.index - 100);
  const end = Math.min(orig.length, match.index + 200);
  console.log(`Position ${match.index}: ${orig.substring(start, end)}`);
  console.log();
}
