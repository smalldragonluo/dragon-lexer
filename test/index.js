/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Test
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Lexer = require('../src/lexer');

let code = fs.readFileSync(path.join(__dirname, 'code.txt'), {
  encoding: 'utf-8'
});

let scanner = new Lexer(code);
let token;

while (token = scanner.scan()) {
  console.log(`line: ${token.line} startPos: ${token.startPos} endPos: ${token.endPos} tag: ${token.tag} value: ${token.value} lexeme: "${token.lexeme}"`);
}
