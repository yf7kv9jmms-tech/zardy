const fs = require('fs');

// Check if manifest paths are correctly URL-encoded
const raw = fs.readFileSync('manifest/shared.json', 'utf8');

// The manifest should have URL-encoded paths like assets%2Fshared%2Fimages%2FZardy.png
// Let's verify the encoding is correct

console.log('=== Checking URL encoding in shared.json ===');

// Check a few specific paths
const checks = [
  'assets%2Fshared%2Fimages%2FZardy.png',
  'assets%2Fshared%2Fimages%2FBOYFRIEND.png',
  'assets%2Fshared%2Fimages%2Fportraits.png'
];

checks.forEach(encoded => {
  const found = raw.includes(encoded);
  const decoded = decodeURIComponent(encoded);
  console.log(`${encoded}`);
  console.log(`  Decoded: ${decoded}`);
  console.log(`  Found in manifest: ${found}`);
  console.log();
});

// Also check the raw format around Zardy
const zardyIdx = raw.indexOf('Zardy');
if (zardyIdx >= 0) {
  console.log('=== Raw manifest around Zardy ===');
  console.log(raw.substring(Math.max(0, zardyIdx - 100), zardyIdx + 100));
}
