const fs = require('fs');
const { execSync } = require('child_process');

// change name in package.json to folder name
const packageJson = JSON.parse(fs.readFileSync('./package.json'));
packageJson.name = __dirname.split('/').pop();
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
console.log('package.json name changed');

// remove folder .git
fs.rmdirSync('.git', { recursive: true });
execSync('git init');
execSync('git add .');
execSync('git commit -m "initial commit"');
execSync('git branch -M main');
console.log('git initialized');

// remove postScript.js
fs.unlinkSync('./postScript.js');
console.log('postScript.js removed');