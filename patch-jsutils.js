const fs = require('fs');

const pFile = '/tmp/jsutils/src/pronoun/declensionPronoun.ts';
let pContent = fs.readFileSync(pFile, 'utf8');
pContent = pContent.replace(/nom: \['jejin', 'jejna', 'jejno'/g, "nom: ['jejin', 'jejno', 'jejna'");
pContent = pContent.replace(/acc: \['jejnogo \/ jejin', 'jejnu', 'jejnogo \/ jejno'/g, "acc: ['jejnogo / jejin', 'jejno', 'jejnu'");
fs.writeFileSync(pFile, pContent);

const nFile = '/tmp/jsutils/src/numeral/declensionNumeral.ts';
let nContent = fs.readFileSync(nFile, 'utf8');
nContent = nContent.replace(/\['masculine', 'feminine\/neuter'\]/g, "['masculine/neuter', 'feminine']");
fs.writeFileSync(nFile, nContent);

// Note: I already successfully patched noun using `multi_replace_file_content` in step 522!
// Wait! Wait! `multi_replace_file_content` edited `/tmp/jsutils/src/noun/declensionNoun.ts` successfully!
// So I don't need to patch noun, only pronoun and numeral!

console.log('Fixed pronoun and numeral src files in locally cloned js-utils');
