const fs = require('fs');

const cur = fs.readFileSync('Funkin.js', 'utf8');
const orig = fs.readFileSync('fnf.run3.io/fnf.run3.io/zardy-foolhardy-pack/1/Funkin.js', 'utf8');

// Find all differences between the two files
let differences = [];
let curPos = 0;
let origPos = 0;

// Simple diff: find sections that differ
while (curPos < cur.length && origPos < orig.length) {
  if (cur[curPos] !== orig[origPos]) {
    // Found a difference, capture context
    const contextStart = Math.max(0, curPos - 200);
    const contextEnd = Math.min(cur.length, curPos + 200);
    differences.push({
      position: curPos,
      current: cur.substring(contextStart, contextEnd),
      original: orig.substring(Math.max(0, origPos - 200), Math.min(orig.length, origPos + 200))
    });
    // Skip ahead to find next match
    curPos += 200;
    origPos += 200;
  } else {
    curPos++;
    origPos++;
  }
  
  if (differences.length >= 10) break;
}

console.log(`Found ${differences.length} differences\n`);

differences.forEach((diff, i) => {
  console.log(`=== Difference ${i + 1} at position ${diff.position} ===`);
  console.log('CURRENT:', diff.current);
  console.log('ORIGINAL:', diff.original);
  console.log();
});
