function _bind(asThis, ...args) {
  //这里的 this 就是调用bind 的函数
  const fn = this
  if(typeof fn !== "function"){
    throw Error("bind 只支持函数调用")
  }
  return function (...args2) {
    return fn.call(asThis, ...args, ...args2)
  }
}

module.exports = _bind;
