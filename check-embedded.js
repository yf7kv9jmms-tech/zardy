const fs = require('fs');

const c = fs.readFileSync('Funkin.js', 'utf8');

// Find the embedded manifest and check for character assets
const idx = c.indexOf('"rootPath":null,"version":2');
if (idx >= 0) {
  let start = idx;
  while (start > 0 && c[start] !== '{') start--;
  let end = idx;
  let braceCount = 0;
  for (let i = start; i < c.length; i++) {
    if (c[i] === '{') braceCount++;
    if (c[i] === '}') braceCount--;
    if (braceCount === 0) {
      end = i + 1;
      break;
    }
  }
  
  const manifest = c.substring(start, end);
  const decoded = decodeURIComponent(manifest);
  
  console.log('=== Checking embedded manifest for character assets ===');
  
  // Check for shared images
  const hasZardy = decoded.includes('Zardy');
  const hasSharedImages = decoded.includes('assets/shared/images');
  const hasBoyfriend = decoded.includes('BOYFRIEND');
  
  console.log(`Has Zardy: ${hasZardy}`);
  console.log(`Has assets/shared/images: ${hasSharedImages}`);
  console.log(`Has BOYFRIEND: ${hasBoyfriend}`);
  
  // List all image assets in embedded manifest
  const imageAssets = decoded.match(/assets\/[^"y]+\.png/g);
  console.log('\n=== Image assets in embedded manifest ===');
  if (imageAssets) {
    imageAssets.forEach(a => console.log(a));
  }
}
