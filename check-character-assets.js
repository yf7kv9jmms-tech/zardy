const fs = require('fs');

// Decode and check shared.json for character assets
const raw = fs.readFileSync('manifest/shared.json', 'utf8');
const decoded = decodeURIComponent(raw);

console.log('=== Checking shared.json for character assets ===');

// Check for specific character assets
const assets = [
  'Zardy.png',
  'Zardy.xml',
  'BOYFRIEND.png',
  'BOYFRIEND.xml',
  'GF_assets.png',
  'GF_assets.xml',
  'portraits.png',
  'portraits.xml',
  'portraits-bf.png',
  'portraits-bf.xml',
  'healthBar.png',
  'NOTE_assets.png',
  'NOTE_assets.xml'
];

assets.forEach(asset => {
  const exists = decoded.includes(asset);
  console.log(`${asset}: ${exists ? 'FOUND' : 'MISSING'}`);
});

// Also check rootPath
const rootPathMatch = decoded.match(/"rootPath":"([^"]*)"/);
console.log(`\nrootPath: ${rootPathMatch ? rootPathMatch[1] : 'NOT FOUND'}`);
