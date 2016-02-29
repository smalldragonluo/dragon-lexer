/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Character 类
 */

'use strict';

function Mod() {
  return Mod;
}

/**
 * 定义常量属性
 * @param obj
 * @param key
 * @param value
 */
Mod.defineConst = function(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    writable: false,
    value: value
  });
};

/**
 * 浅拷贝可枚举属性，包括 getter & setter
 * @param target
 * @param origin
 */
Mod.merge = function(target, origin) {
  for (var key in origin) {
    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(origin, key));
  }
};

/**
 * 用于定义一个类
 * @param constructor
 * @param parent
 * @param properties
 * @param statics
 * @param isSingleton
 * @returns {*}
 */
Mod.defineClass = function defineClass(constructor, parent, properties, statics, isSingleton) {
  if (typeof parent === 'function') {
    var oldProtoTypes = constructor.prototype;
    var Proxy = new Function();

    // 设置原型属性，包括 parent 与 constructor 的原型
    Proxy.prototype = parent.prototype;
    constructor.prototype = new Proxy();
    Mod.merge(constructor.prototype, oldProtoTypes);

    // 设置正确的 constructor，保留父类函数引用
    constructor.prototype.constructor = constructor;
    constructor.prototype.super = function() {
      parent.apply(this, arguments);
    };
  }

  // 将自有属性复制到原型中，将静态属性复制到构造函数中，parent 的静态属性不会被继承
  Mod.merge(constructor.prototype, properties);
  Mod.merge(constructor, statics);

  // 如果为单例模式，保存实例，并在以后的调用中返回此实例
  if (isSingleton) {
    var instance, oldConstructor = constructor;

    constructor = function() {
      return instance || oldConstructor.apply(this, arguments) && (instance = this);
    }
  }

  return constructor;
};

module.exports = Mod;
