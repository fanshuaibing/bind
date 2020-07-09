var slice = Array.prototype.slice;

/**
 * es5版本
 * @param asThis
 * @param args
 * @returns {function(...[*]): *}
 * @private
 */
function _bind(asThis, ...args) {
  var fn = this
  if (typeof fn !== "function") {
    throw Error("bind 只支持函数调用")
  }
   function resultFn(...args2) {
    return fn.call(this instanceof resultFn ? this : asThis, ...args, ...args2)
  }
  resultFn.prototype = fn.prototype
  return resultFn
}

/**
 *  es3版本
 * @param asThis
 */
function bind(asThis){
  var fn = this
  var args1 = slice.call(arguments,1)
  if (typeof fn !== "function") {
    throw Error("bind 只支持函数调用")
  }

  function resultFn() {
    var args2 = slice.call(arguments,0 )
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this)? this: asThis,
      args1.concat(args2)
    )
  }
  resultFn.prototype = fn.prototype
  return resultFn;
}

module.exports = _bind


