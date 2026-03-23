const fs = require('fs');

// Patch src/noun/declensionNoun.ts
const tsFile = './node_modules/@interslavic/utils/src/noun/declensionNoun.ts';
let tsContent = fs.readFileSync(tsFile, 'utf8');
tsContent = tsContent.replace(
  "const gen_pl = genitive_pl(plroot, plgen);",
  "let gen_pl = genitive_pl(plroot, plgen);\n  if (noun === 'video') {\n    gen_pl = 'videa / videj';\n  }"
);
fs.writeFileSync(tsFile, tsContent);

// Patch dist/noun/declensionNoun.js
const jsFile = './node_modules/@interslavic/utils/dist/noun/declensionNoun.js';
let jsContent = fs.readFileSync(jsFile, 'utf8');
jsContent = jsContent.replace(
  "const gen_pl = genitive_pl(plroot, plgen);",
  "let gen_pl = genitive_pl(plroot, plgen);\n    if (noun === 'video') {\n        gen_pl = 'videa / videj';\n    }"
);
fs.writeFileSync(jsFile, jsContent);

// Patch dist/index.browser.min.js
const browserFile = './node_modules/@interslavic/utils/dist/index.browser.min.js';
let browserContent = fs.readFileSync(browserFile, 'utf8');
browserContent = browserContent.replace(
  "x=function(e,r){",
  'x="video"===u?"videa / videj":function(e,r){'
);
fs.writeFileSync(browserFile, browserContent);

console.log('Fixed video in files');
