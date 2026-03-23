const fs = require('fs');

const tsFile = './node_modules/@interslavic/utils/src/numeral/declensionNumeral.ts';
let tsContent = fs.readFileSync(tsFile, 'utf8');
tsContent = tsContent.replace(/\['masculine', 'feminine\/neuter'\]/g, "['masculine/neuter', 'feminine']");
fs.writeFileSync(tsFile, tsContent);

const jsFile = './node_modules/@interslavic/utils/dist/index.browser.min.js';
let jsContent = fs.readFileSync(jsFile, 'utf8');
jsContent = jsContent.replace(/\["masculine","feminine\/neuter"\]/g, '["masculine/neuter","feminine"]');
fs.writeFileSync(jsFile, jsContent);

const distFile = './node_modules/@interslavic/utils/dist/numeral/declensionNumeral.js';
let distContent = fs.readFileSync(distFile, 'utf8');
distContent = distContent.replace(/\['masculine', 'feminine\/neuter'\]/g, "['masculine/neuter', 'feminine']");
fs.writeFileSync(distFile, distContent);

console.log('Fixed numeral headers in files');
