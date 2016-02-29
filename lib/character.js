/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Character 类
 */

'use strict';

function Mod() {

}

Mod.isDigit = function(str) {
  return str.charCodeAt(0) > 47 && str.charCodeAt(0) < 58;
};

Mod.isLetter = function(str) {
  return (str.charCodeAt(0) > 96 && str.charCodeAt(0) < 123) || (str.charCodeAt(0) > 64 && str.charCodeAt(0) < 91);
};

module.exports = Mod;
