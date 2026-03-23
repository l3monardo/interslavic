import re
with open('patches/@interslavic+utils+0.0.0.patch', 'r') as f:
    text = f.read()

# Split the patch file by 'diff --git'
chunks = text.split('diff --git ')
filtered_chunks = []

for chunk in chunks:
    if not chunk.strip():
        continue
    
    # We ONLY want chunks that modify the files we manually touched.
    if ('declensionPronoun.ts' in chunk and 'deleted file' not in chunk) or \
       ('declensionNumeral.ts' in chunk and 'deleted file' not in chunk) or \
       ('declensionNoun.ts' in chunk and 'deleted file' not in chunk) or \
       ('declensionPronoun.js' in chunk and 'deleted file' not in chunk) or \
       ('declensionNumeral.js' in chunk and 'deleted file' not in chunk) or \
       ('declensionNoun.js' in chunk and 'deleted file' not in chunk) or \
       ('index.browser.min.js' in chunk and 'deleted file' not in chunk):
        filtered_chunks.append('diff --git ' + chunk)

with open('patches/@interslavic+utils+0.0.0.patch', 'w') as f:
    f.writelines(filtered_chunks)
