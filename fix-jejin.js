const fs = require('fs');
const tsFile = './node_modules/@interslavic/utils/src/pronoun/declensionPronoun.ts';
let tsContent = fs.readFileSync(tsFile, 'utf8');
tsContent = tsContent.replace(/nom: \['jejin', 'jejna', 'jejno'\],/g, "nom: ['jejin', 'jejno', 'jejna'],");
tsContent = tsContent.replace(/acc: \['jejnogo \/ jejin', 'jejnu', 'jejnogo \/ jejno'\],/g, "acc: ['jejnogo / jejin', 'jejno', 'jejnu'],");
fs.writeFileSync(tsFile, tsContent);

const jsFile = './node_modules/@interslavic/utils/dist/index.browser.min.js';
let jsContent = fs.readFileSync(jsFile, 'utf8');
jsContent = jsContent.replace(/nom:\["jejin","jejna","jejno"\]/g, 'nom:["jejin","jejno","jejna"]');
jsContent = jsContent.replace(/acc:\["jejnogo \/ jejin","jejnu","jejnogo \/ jejno"\]/g, 'acc:["jejnogo / jejin","jejno","jejnu"]');
fs.writeFileSync(jsFile, jsContent);

const distFile = './node_modules/@interslavic/utils/dist/pronoun/declensionPronoun.js';
let distContent = fs.readFileSync(distFile, 'utf8');
distContent = distContent.replace(/nom: \['jejin', 'jejna', 'jejno'/g, "nom: ['jejin', 'jejno', 'jejna'");
distContent = distContent.replace(/acc: \['jejnogo \/ jejin', 'jejnu', 'jejnogo \/ jejno'/g, "acc: ['jejnogo / jejin', 'jejno', 'jejnu'");
fs.writeFileSync(distFile, distContent);

console.log('Fixed jejin in files');
