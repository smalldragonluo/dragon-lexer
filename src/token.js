/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Token 类
 */

const utils = require('../lib/utils');

function Mod(tag, line, lPos) {
  this._tag = tag;
  this._line = line;
  this._lPos = lPos;
}

Mod.prototype = {
  get tag() {
    return this._tag;
  },
  get line() {
    return this._line;
  },
  get lPos() {
    return this._lPos;
  }
};

utils.defineConst(Mod, 'NUM', 256);
utils.defineConst(Mod, 'ID', 257);
utils.defineConst(Mod, 'TRUE', 258);
utils.defineConst(Mod, 'FALSE', 259);

module.exports = Mod;
