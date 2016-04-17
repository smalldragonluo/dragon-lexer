/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Token 类
 */

'use strict';

const utils = require('../lib/utils');

function Mod(tag, line, startPos, endPos) {
  this._tag = tag;
  this._line = line;
  this._startPos = startPos;
  this._endPos = endPos;
}

Mod.prototype = {
  get tag() {
    return this._tag;
  },
  get line() {
    return this._line;
  },
  get startPos() {
    return this._startPos;
  },
  get endPos() {
    return this._endPos;
  }
};

utils.defineConst(Mod, 'NUM', 256);
utils.defineConst(Mod, 'ID', 257);
utils.defineConst(Mod, 'TRUE', 258);
utils.defineConst(Mod, 'FALSE', 259);

module.exports = Mod;
