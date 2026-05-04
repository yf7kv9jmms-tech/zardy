const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find how asset URLs are constructed for HTTP requests
const patterns = [
  'HTTPRequest',
  'XMLHttpRequest',
  'loadFromFile',
  '__url'
];

patterns.forEach(p => {
  let idx = 0;
  let count = 0;
  while ((idx = c.indexOf(p, idx)) >= 0) {
    if (count < 2) {
      console.log(`\n=== Found '${p}' (occurrence ${count + 1}) ===`);
      console.log(c.substring(Math.max(0, idx-100), idx+300));
    }
    idx++;
    count++;
  }
});
