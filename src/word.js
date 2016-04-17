/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Word 类
 */

'use strict';

const Token = require('./token');
const utils = require('../lib/utils');

function Mod(lexeme, line, startPos, endPos) {
  this.super(Token.ID, line, startPos, endPos);
  this._lexeme = lexeme;
}

Mod.prototype = {
  get lexeme() {
    return this._lexeme;
  }
};

module.exports = utils.defineClass(Mod, Token);
