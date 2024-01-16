const fs = require('fs');

console.log('Post-create script: Running after project creation.');
fs.writeFileSync('post-script.log', 'This is a post-create script.');