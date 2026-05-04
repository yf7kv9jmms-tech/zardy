const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find __resolvePath implementation
const idx = c.indexOf('__resolvePath=function');
if (idx >= 0) {
  console.log('=== __resolvePath function ===');
  // Find the full function
  let braceCount = 0;
  let start = idx;
  let foundStart = false;
  for (let i = idx; i < c.length; i++) {
    if (c[i] === '{') {
      braceCount++;
      foundStart = true;
    }
    if (c[i] === '}') braceCount--;
    if (foundStart && braceCount === 0) {
      console.log(c.substring(idx, i + 1));
      break;
    }
  }
}

// Also find __resolveRootPath implementation  
const idx2 = c.indexOf('__resolveRootPath=function');
if (idx2 >= 0) {
  console.log('\n=== __resolveRootPath function ===');
  let braceCount = 0;
  let foundStart = false;
  for (let i = idx2; i < c.length; i++) {
    if (c[i] === '{') {
      braceCount++;
      foundStart = true;
    }
    if (c[i] === '}') braceCount--;
    if (foundStart && braceCount === 0) {
      console.log(c.substring(idx2, i + 1));
      break;
    }
  }
}
