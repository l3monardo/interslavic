set -e

echo "Starting fresh by removing any leftover patch file"
rm -f patches/@interslavic+utils+0.0.0.patch

echo "Installing base node modules"
npm install

echo "Applying all three patches (jejin, numerals, video)"
node fix-jejin.js
node fix-numeral-headers.js
node fix-video.js

echo "Triggering patch-package to compute differences"
npx patch-package @interslavic/utils

echo "Filtering broken deleted chunks from the generated patch"
python3 filter-patch-v2.py

echo "Doing a final npm install to apply the newly minted valid patch"
npm install

echo "Building the final dictionary output with Vite"
npm run build

echo "Done!"
