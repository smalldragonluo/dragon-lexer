/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Lexer 类
 */

'use strict';

const character = require('../lib/character');
const Num = require('./num');
const Word = require('./word');
const util = require('util');

function Mod(str) {
  this._str = str;
  this._peek = ' ';
  this._line = 0;
  this._pos = 0;
  this._lPos = 0;
  this._lastLPos = 0;
}

Mod.prototype = {
  /**
   * 扫描一个 token
   * @returns {*}
   */
  scan: function() {
    do {
      this._peek = this.readChar();

      if (this._peek === null) {
        return null;
      } else if (this._peek !== ' ' && this._peek !== '\n') {
        break;
      }
    } while (true);

    if (character.isDigit(this._peek)) {
      let value = parseInt(this._peek);

      while ((this._peek = this.readChar()) !== null && character.isDigit(this._peek)) {
        value = value * 10 + parseInt(this._peek);
      }

      return new Num(value, this._line - 1 > -1 ? this._line - 1 : 0, this._lastLPos);
    } else if (character.isLetter(this._peek)) {
      let lexeme = this._peek;

      while ((this._peek = this.readChar()) !== null && (character.isLetter(this._peek) || character.isDigit(this._peek))) {
        lexeme += this._peek;
      }

      return new Word(lexeme, this._line - 1 > -1 ? this._line - 1 : 0, this._lastLPos);
    } else {
      throw new SyntaxError('unexpected token');
    }
  },
  /**
   * 读取一个长度为 1 的字符串
   * @returns {*}
   */
  readChar: function() {
    if (this._pos < this._str.length - 1) {
      ++this._pos;
      this._lastLPos = this._lPos;

      if (this._str[this._pos] === '\n') {
        ++this._line;
        this._lPos = -1;
      } else {
        ++this._lPos;
      }

      return this._str[this._pos];
    } else {
      return null;
    }
  }
};

module.exports = Mod;
