const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const project_name = __dirname.split('/').pop();

// change name in package.json to folder name
const packageJson = JSON.parse(fs.readFileSync('./package.json'));
packageJson.name = project_name;
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
console.log('package.json name changed');

// remove folder .git
fs.rmdirSync('.git', { recursive: true });
execSync('git init');
execSync('git add .');
execSync('git commit -m "initial commit"');
execSync('git branch -M main');
console.log('git initialized');

// replace index.html %SITE_NAME% with project name
const indexHtml = fs.readFileSync(path.join(__dirname, './public/index.html')).toString();
fs.writeFileSync(path.join(__dirname, './public/index.html'), indexHtml.replace('%SITE_NAME%', project_name));
console.log('index.html changed');

// replace README.md %PROJECT_NAME% with project name
const readme = fs.readFileSync(path.join(__dirname, './README.md')).toString();
fs.writeFileSync(path.join(__dirname, './README.md'), readme.replace('%PROJECT_NAME%', project_name));
console.log('README.md changed');

// remove postScript.js
fs.unlinkSync('./postScript.js');
console.log('postScript.js removed');