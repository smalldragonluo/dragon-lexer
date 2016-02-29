/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Num 类
 */

const Token = require('./token');
const utils = require('../lib/utils');

function Mod(value, line, lPos) {
  this.super(Token.NUM, line, lPos);
  this._value = value;
}

Mod.prototype = {
  get value() {
    return this._value;
  }
};

module.exports = utils.defineClass(Mod, Token);
