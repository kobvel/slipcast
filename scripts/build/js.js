'use strict';

const config = require('../../config/slipcast');
const { join } = require('path');
const rollup = require('rollup');
const rollupConfig = require('../../config/rollup');

config.files.filter(file => {
  return file.endsWith('.js');
}).forEach(file => {
  rollup.rollup(rollupConfig(file)).then(function(bundle) {
    Promise.all([
      bundle.write({
        dest: join(config.output, file.replace(/\.js$/, '.es.js')),
        format: 'es',
        sourceMap: true
      }),
      bundle.write({
        dest: join(config.output, file.replace(/\.js$/, '.umd.js')),
        format: 'umd',
        sourceMap: true
      })
    ]).catch(function(error) {
      console.error(error);
    });
  }).catch(function(error) {
    console.error(error);
  });
});
