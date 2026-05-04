const fs = require('fs');

// Decode all week manifests
['week0', 'week1', 'week2', 'week3'].forEach(week => {
  try {
    const raw = fs.readFileSync(`manifest/${week}.json`, 'utf8');
    const decoded = decodeURIComponent(raw);
    
    console.log(`\n=== ${week}.json ===`);
    console.log(`rootPath: ${decoded.match(/"rootPath":"([^"]*)"/)?.[1]}`);
    
    // Extract asset paths
    const paths = decoded.match(/assets\/[^"y]+/g);
    if (paths) {
      console.log('Assets:');
      paths.forEach(p => console.log(`  ${p}`));
    }
  } catch(e) {
    console.log(`\n=== ${week}.json NOT FOUND ===`);
  }
});
