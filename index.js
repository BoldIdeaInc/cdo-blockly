'use strict';

var extend = require('util')._extend;

var Blockly = require('./blockly_compressed');

Blockly.Msg = extend(require('./i18n/en'), Blockly.Msg);
Blockly.Msg = Blockly.Msg();

Blockly.Blocks = extend(Blockly.Blocks, require('./blocks_compressed')(Blockly));

module.exports = Blockly;
