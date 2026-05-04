const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find preload configuration
const idx = c.indexOf('preloadLibraries');
if (idx >= 0) {
  console.log('=== preloadLibraries context ===');
  console.log(c.substring(Math.max(0, idx-100), idx+500));
}

// Find where libraries are preloaded vs loaded on demand
const idx2 = c.indexOf('de.preloadLibraries.push');
if (idx2 >= 0) {
  console.log('\n=== Library preloading ===');
  console.log(c.substring(Math.max(0, idx2-200), idx2+300));
}
