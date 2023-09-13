const fs = require("fs");
const {execSync} = require("child_process");
const config = JSON.parse(fs.readFileSync('package.json').toString());
const currentVersion = config.version;
const libs = [
  'dialog',
  'dynamic-component',
  'icon',
  'icons-animated',
  'snackbar',
  'file-button',
  'button',
  'alert',
  'folder-page',
  'menu',
  'core',
  'common',
  'question',
  'form',
  'list',
];

for (const [index, lib] of libs.entries()) {
  execSync(`ng build ${lib} --configuration production`, {stdio: 'ignore'});
  console.log(`[${index + 1} of ${libs.length}] ${lib} built with successfully.`);
}

fs.writeFileSync('dist/package.json', JSON.stringify({
  "name": "@koalarx/ui",
  "version": currentVersion,
  "description": config.description,
  "repository": {
    "type": "git",
    "url": "git+https://github.com/igordrangel/koala-angular-template.git"
  },
  "keywords": config.keywords,
  "author": "Igor D. Rangel",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/igordrangel/koala-angular-template/issues"
  },
  "homepage": "https://github.com/igordrangel/koala-angular-template#readme",
  "types": "./koalarx-ui.d.ts",
  "peerDependencies": {
    "@angular/core": ">=15.0.4",
    "@angular/cli": ">=15.0.4",
    "@angular/material": ">=15.0.3"
  },
  "dependencies": {
    "tslib": "^2.2.0",
    "exceljs": "^3.10.0",
    "file-saver": "^2.0.5",
    "jwt-decode": "^3.0.0",
    "jwt-encode": "^1.0.1",
    "@koalarx/utils": "^1.0.101",
    "ng2-currency-mask": "^13.0.3",
    "ngx-device-detector": "^4.0.1",
    "event-source-polyfill": "^1.0.25",
    "ngx-mask": "^15.0.2",
    "ngx-papaparse": "^6.0.2",
    "xlsx": "^0.17.0",
    "rxjs": "~7.5.0"
  }
}), 'utf8');
fs.writeFileSync('dist/README.md', fs.readFileSync('README.md').toString(), 'utf8');

console.log('Build completed');
