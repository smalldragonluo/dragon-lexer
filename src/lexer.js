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

  // 向前看符号
  this._peek = ' ';

  // 当前行数
  this._line = 0;

  // 当前字符索引位置
  this._pos = -1;

  // 当前行字符索引位置
  this._linePos = -1;

  // token 当前行开始索引位置
  this._lineStartPos = -1;
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
        this._lineStartPos = this._linePos;
        break;
      }
    } while (true);

    if (character.isDigit(this._peek)) {
      let value = parseInt(this._peek);

      while ((this._peek = this.readChar()) !== null && character.isDigit(this._peek)) {
        value = value * 10 + parseInt(this._peek);
      }

      return new Num(value, this._line, this._lineStartPos, this._linePos - 1);
    } else if (character.isLetter(this._peek)) {
      let lexeme = this._peek;

      while ((this._peek = this.readChar()) !== null && (character.isLetter(this._peek) || character.isDigit(this._peek))) {
        lexeme += this._peek;
      }

      return new Word(lexeme, this._line, this._lineStartPos, this._linePos - 1);
    } else {
      throw new SyntaxError('unexpected token');
    }
  },
  /**
   * 读取一个长度为 1 的字符串
   * @returns {*}
   */
  readChar: function() {
    ++this._linePos;

    if (this._pos < this._str.length - 1) {
      ++this._pos;

      if (this._pos !== 0 && this._str[this._pos - 1] === '\n') {
        ++this._line;
        this._linePos = 0;
      }

      return this._str[this._pos];
    } else {
      return null;
    }
  }
};

module.exports = Mod;
