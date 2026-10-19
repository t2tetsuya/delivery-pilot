// Run: node safety_regression_test.js
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
assert.match(html,/const VERSION='2\.24';/);
assert.match(html,/const APP_VERSION='v2\.24';/);
assert.match(sw,/const VERSION='v2\.24';/);
assert.doesNotMatch(html,/keys\.filter\(k=>!k\.includes\('v2\.19'\)\)/);
assert.match(html,/k\.startsWith\('delivery-pilot-'\) && k!=='delivery-pilot-v2\.24-1791101231'/);
assert.match(html,/function validImportedBackup\(o\)/);
assert.match(html,/downloadBackup\(state,'delivery-pilot-before-import-'/);
assert.ok(html.indexOf('downloadBackup(state,')<html.indexOf('localStorage.setItem(KEY,JSON.stringify(next))'));
assert.doesNotMatch(html,/id:'seed1'/);
assert.match(html,/rows:\[\]/);
assert.match(html,/typeof r.date==='string'/);
assert.match(html,/const next=JSON.parse\(JSON.stringify\(incoming\)\)/);
assert.match(html,/ダウンロードが完了したことを確認しましたか/);
console.log('PASS: version, cache and backup import source guards');

