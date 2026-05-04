const fs = require('fs');
const c = fs.readFileSync('Funkin.js', 'utf8');
const i = c.indexOf('shared.json');
if (i >= 0) {
  console.log(c.substring(Math.max(0, i-200), i+400));
} else {
  console.log('not found');
}

// Also find all manifest references
const matches = [];
let idx = 0;
while ((idx = c.indexOf('.json', idx)) >= 0) {
  const start = Math.max(0, idx - 50);
  const end = idx + 30;
  matches.push(c.substring(start, end));
  idx++;
  if (matches.length > 20) break;
}
console.log('\n\n--- .json references ---');
matches.forEach((m, i) => console.log(`${i}: ${m}`));
