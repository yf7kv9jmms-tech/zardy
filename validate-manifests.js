const fs = require('fs');

// Check if manifests are valid JSON-like (they use a custom format)
const manifests = ['shared.json', 'songs.json', 'week0.json', 'week1.json', 'week2.json', 'week3.json'];

manifests.forEach(m => {
  try {
    const content = fs.readFileSync(`manifest/${m}`, 'utf8');
    const decoded = decodeURIComponent(content);
    
    // Check for required fields
    const hasRootPath = decoded.includes('"rootPath"');
    const hasAssets = decoded.includes('"assets"');
    const hasVersion = decoded.includes('"version"');
    
    // Extract rootPath value
    const rootPathMatch = decoded.match(/"rootPath":"([^"]*)"/);
    const rootPath = rootPathMatch ? rootPathMatch[1] : 'NOT FOUND';
    
    // Count assets
    const assetCount = (decoded.match(/:pathy/g) || []).length;
    
    console.log(`${m}:`);
    console.log(`  rootPath: "${rootPath}"`);
    console.log(`  hasAssets: ${hasAssets}`);
    console.log(`  hasVersion: ${hasVersion}`);
    console.log(`  asset count: ${assetCount}`);
    console.log();
  } catch(e) {
    console.log(`${m}: ERROR - ${e.message}\n`);
  }
});
