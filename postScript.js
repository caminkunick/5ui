const fs = require('fs');
const { execSync } = require('child_process');

// remove folder .git
fs.rmdirSync('.git', { recursive: true });

// init git
execSync('git init');

// add all files
execSync('git add .');

// commit
execSync('git commit -m "initial commit"');

// change branch name to main
execSync('git branch -M main');

// change name in package.json to folder name
const packageJson = JSON.parse(fs.readFileSync('./package.json'));
packageJson.name = __dirname.split('/').pop();
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

// remove postScript.js
fs.unlinkSync('./postScript.js');