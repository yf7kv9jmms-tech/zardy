const fs = require('fs');

const cur = fs.readFileSync('Funkin.js', 'utf8');
const orig = fs.readFileSync('fnf.run3.io/fnf.run3.io/zardy-foolhardy-pack/1/Funkin.js', 'utf8');

// Find all occurrences of getPath with library parameter
function findGetPathCalls(content) {
  const regex = /getPath\("([^"]+)","([^"]+)","([^"]+)"\)/g;
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push({
      path: match[1],
      type: match[2],
      library: match[3]
    });
  }
  return matches;
}

const curCalls = findGetPathCalls(cur);
const origCalls = findGetPathCalls(orig);

console.log('Current getPath calls with library parameter:');
curCalls.filter(c => c.library !== 'null').forEach(c => {
  console.log(`  ${c.path} (${c.type}) from "${c.library}"`);
});

console.log('\nOriginal getPath calls with library parameter:');
origCalls.filter(c => c.library !== 'null').forEach(c => {
  console.log(`  ${c.path} (${c.type}) from "${c.library}"`);
});

console.log('\n=== Summary ===');
console.log(`Current: ${curCalls.filter(c => c.library !== 'null').length} calls with non-null library`);
console.log(`Original: ${origCalls.filter(c => c.library !== 'null').length} calls with non-null library`);
