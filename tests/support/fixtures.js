const { execSync } = require('child_process');
const { join } = require('path');
const rimraf = require('rimraf');

function expectedAndCompressedFiles(fixtureName) {
  const initialFiles = expectedFiles(fixtureName);
  const compressedFiles = initialFiles.filter(file => {
    return file.match(/\.(css|html|ico|jpg|jpeg|js|json|png|rss|xml)$/i);
  }).map(file => file + '.gz');

  return initialFiles.concat(compressedFiles).sort();
}

function expectedFiles(fixtureName) {
  const config = require(join(__dirname, '../fixtures', fixtureName, 'static.json'));
  return config.test.expectedFiles.sort().map(file => {
    return join(__dirname, '../../.tmp', config.output, file);
  });
}

function loadFixture(fixtureName) {
  return function () {
    rimraf.sync(join(__dirname, '../../.tmp'));
    execSync(`cp -R ${join(__dirname, '../fixtures', fixtureName, '/')} ${join(__dirname, '../../.tmp')}`, { stdio: 'inherit' });
  }
}

module.exports = {
  expectedFiles: expectedFiles,
  expectedAndCompressedFiles: expectedAndCompressedFiles,
  loadFixture: loadFixture
}