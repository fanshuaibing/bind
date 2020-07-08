const _bind = require("../src/index")


Function.prototype.bind2 = _bind;


const fn1 = function () {
  return this
}

const newFn1 = fn1.bind2({name:"fatfan"}) // fn1 就是src 中的 this
console.log(newFn1().name === "fatfan")

