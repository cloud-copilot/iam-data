cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF
rm dist/cjs/readRelativeFileEsm.*

cat >dist/esm/package.json <<!EOF
{
    "type": "module"
}
!EOF
mv dist/esm/readRelativeFileEsm.js dist/esm/readRelativeFile.js
mv dist/esm/readRelativeFileEsm.d.ts dist/esm/readRelativeFile.d.ts
mv dist/esm/readRelativeFileEsm.js.map dist/esm/readRelativeFile.js.map