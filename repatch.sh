#!/bin/bash
set -e

echo "Removing broken patch..."
rm -f patches/@interslavic+utils+0.0.0.patch

echo "Reinstalling dependencies..."
npm install

echo "Installing devDependencies for utils..."
cd node_modules/@interslavic/utils
npm install --ignore-scripts
cd ../../../

echo "Applying fixes..."
node fix-jejin.js
node fix-numeral-headers.js
node fix-video.js

echo "Generating patch..."
npx patch-package @interslavic/utils
