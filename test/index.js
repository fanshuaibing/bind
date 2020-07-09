const _bind = require("../src/index")
Function.prototype.bind2 = _bind;


test1("bind2 绑定到原型链上了")
test2("fn 绑定了传入的 this ")
test3("fn 绑定了传入的 this ,p1 , p2")
test4("绑定 this p1 以及后传的 p2 调用成功")
test5("new 的时候绑定了 p1 , p2")
test6("new 的时候绑定了 p1 p2 并且生成的对象有 prototype.sayHi ")
test7("不要new 用new 对比 用 new 会有原型链 不用new 返回值为 undefined")
function test1(message) {
  console.log(message);
  Function.prototype.bind2 = _bind;
  console.assert(Function.prototype.bind2 !== undefined);
}


function test2(message) {
  console.log(message)
  const fn = function () {
    return this
  }
  Function.prototype.bind2 = _bind
  const newFn1 = fn.bind2({name: "fan"});
  console.assert(newFn1().name === "fan");
}


function test3(message) {
  console.log(message)
  Function.prototype.bind2 = _bind
  const fn = function (p1, p2) {
    return [this, p1, p2]
  }
  const newFn = fn.bind({name: "fan"}, "x", "y")
  console.assert(newFn()[0].name === "fan")
  console.assert(newFn()[1] === "x")
  console.assert(newFn()[2] === "y")
}


function test4(message) {
  console.log(message)
  Function.prototype.bind2 = _bind
  const fn = function (p1, p2) {
    return [this, p1, p2]
  }
  const newFn = fn.bind({name: "fan"}, "x")
  console.assert(newFn("y")[0].name === "fan")
  console.assert(newFn("y")[1] === "x")
  console.assert(newFn("y")[2] === "y")
}


function test5(message) {
  console.log(message)
  Function.prototype.bind2 = _bind
  const fn = function (p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  const newFn = fn.bind({name: "fan"}, "x", "y")
  const object = new newFn()
  //  object 就是  resultFn 中的 this ,
  //  fn.call(object, ..args, ...args2)  把 p1 p2 绑定到了 this(object) 上
  console.assert(object instanceof newFn)
  console.assert(object.p1 === "x")
  console.assert(object.p2 === "y")
}




function test6(message) {
  console.log(message);
  Function.prototype.bind2 = _bind;
  const fn = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn.prototype.sayHi = function() {};
  const fn2 = fn.bind2(undefined, "x", "y");
  const object = new fn2();
  console.assert(object.p1 === "x", "p1");
  console.assert(object.p2 === "y", "p2");
  // console.assert(object.__proto__ === fn.prototype);
  console.assert(fn.prototype.isPrototypeOf(object),"prototype");
  console.assert(typeof object.sayHi === "function","sayHi is function");
}



function test7(message) {
  console.log(message);
  Function.prototype.bind2 = _bind;
  const fn = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn.prototype.sayHi = function() {};
  const object = new fn("a", "b");
  const fn2 = fn.bind2(object, "x", "y");
  const object1 = fn2(); // 没有new
  const object2 = new fn2()

  console.assert(object.p1 === "x", "p1");
  console.assert(object.p2 === "y", "p2");
  console.assert(object1 === undefined)


  console.assert(object2.p1 === "x", "obj2 p1");
  console.assert(object2.p2 === "y", "obj2 p2");

  console.assert(typeof object.sayHi === "function","0 sayHi is function");
  console.assert(typeof object2.sayHi === "function","2 sayHi is function");

}
