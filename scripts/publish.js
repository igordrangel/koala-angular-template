const fs = require("fs");
const {execSync} = require("child_process");
const readline = require('readline');
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
  'question',
  'form',
  'list',
];

function writeLine(msg, color = 37) {
  function colorize(color, output) {
    return ['\033[', color, 'm', output, '\033[0m'].join('');
  }

  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(colorize(color, msg));
}

for (const [index, lib] of libs.entries()) {
  writeLine(`[${index + 1} of ${libs.length}] Building package ${lib}...`);
  execSync(`ng build ${lib} --configuration production`, {stdio: 'ignore'});
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
    "@angular/common": ">=12.0.0",
    "@angular/core": ">=12.0.0",
    "@angular/forms": ">=12.0.0",
    "@angular/material": ">=12.0.0",
    "@angular/cdk": ">=12.0.0",
    "@koalarx/utils": ">= 1.0.88"
  },
  "dependencies": {
    "tslib": "^2.0.0",
    "exceljs": "^3.10.0",
    "file-saver": "^2.0.5",
    "jwt-decode": "^3.0.0",
    "jwt-encode": "^1.0.1",
    "@koalarx/utils": "^1.0.88",
    "ng2-currency-mask": "^9.0.2",
    "ngx-device-detector": "^2.1.1",
    "ngx-mask": "^10.0.4",
    "ngx-papaparse": "^5.0.0",
    "xlsx": "^0.17.0",
    "rxjs": "~6.6.3"
  }
}), 'utf8');
fs.writeFileSync('dist/README.md', fs.readFileSync('README.md').toString(), 'utf8');

writeLine('Build completed');
