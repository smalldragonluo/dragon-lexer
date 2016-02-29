/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Word 类
 */

'use strict';

const Token = require('./token');
const utils = require('../lib/utils');

function Mod(lexeme, line, lPos) {
  this.super(Token.ID, line, lPos);
  this._lexeme = lexeme;
}

Mod.prototype = {
  get lexeme() {
    return this._lexeme;
  }
};

module.exports = utils.defineClass(Mod, Token);
