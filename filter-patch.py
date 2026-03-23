import re
with open('patches/@interslavic+utils+0.0.0.patch', 'r') as f:
    text = f.read()

# Split the patch file by 'diff --git'
chunks = text.split('diff --git ')
filtered_chunks = []

for chunk in chunks:
    if not chunk.strip():
        continue
    
    # We only want chunks that modify declensionPronoun.ts, declensionNumeral.ts, index.browser.min.js
    if ('declensionPronoun.ts' in chunk and 'deleted file' not in chunk) or \
       ('declensionNumeral.ts' in chunk and 'deleted file' not in chunk) or \
       ('index.browser.min.js' in chunk and 'deleted file' not in chunk):
        filtered_chunks.append('diff --git ' + chunk)

with open('patches/@interslavic+utils+0.0.0.patch', 'w') as f:
    f.writelines(filtered_chunks)
