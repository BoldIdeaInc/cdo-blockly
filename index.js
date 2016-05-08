'use strict';

var extend = require('util')._extend;

var Blockly = require('./blockly_uncompressed');

Blockly.Msg = extend(require('./i18n/en'), Blockly.Msg);
Blockly.Msg = Blockly.Msg();

Blockly.Blocks = extend(Blockly.Blocks, require('./blocks_uncompressed')(Blockly));
Blockly.JavaScript = require('./javascript_uncompressed')(Blockly);
Blockly.PHP = require('./php_uncompressed')(Blockly);
Blockly.Dart = require('./dart_uncompressed')(Blockly);
Blockly.Python = require('./python_uncompressed')(Blockly);

module.exports = Blockly;
