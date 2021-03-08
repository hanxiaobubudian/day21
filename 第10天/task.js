/*
 * @Description:
 * @Author: yudandan
 * @Date: 2021-03-05 09:31:24
 * @LastEditors: yudandan
 * @LastEditTime: 2021-03-05 15:31:11
 */

/**
 * 1、什么是纯函数？使用纯函数有什么好处？
 * 2、实现add(1)(2)(3)？
 * 3、了解函数式编程中的 compose 吗?动手实现一下?
 */

/**
 * 1、什么是纯函数？使用纯函数有什么好处？
 * 纯函数是根据输入得到对应的输出，并且没有副作用的函数。
 * 优点：
 *  可缓存：对相同的输入会得到相同的输出，所以可以对有相同输入的结果进行缓存
 *  并行代码：纯函数不需要共享内存
 */

let str = "sss";

const log = (str, name) => {
  return `${str}${name}`;
};

const add = (x, y) => {
    return x + y;
}

// memoize
const memoize = (fn) => {
  // 存一个对象缓存函数fn执行的结果
  let cache = {};

  return function (...args) {
    const key = JSON.stringify(arguments);
    // cache[key] = cache[key] || fn.apply(fn, [...args]);
    cache[key] = cache[key] || fn(...args);
    return cache[key];
  };
};
// 纯函数
function pure(x) {
  console.log("执行了pure函数，下面是pure的处理逻辑");
  return x ** 2;
}
// const squareNumber = memoize(pure);
// console.log(squareNumber(6));
// console.log(squareNumber(6));

/**
 * 2、实现add(1)(2)(3)？
 */
// function curringAdd(x) {
//     return function(y) {
//         console.log('第2个参数===', y);
//         return function(z) {
//             console.log('第3个参数===', z);
//             return x + y + z;
//         };
//     }
// }
// 方法2
// function curringAdd(x) {
//     return function(y) {
//         // console.log('第2个参数===', y);
//         // return function(z) {
//         //     console.log('第3个参数===', z);
//         //     return x + y + z;
//         // };
//         console.log(arguments)
//     }
// }

function curringFn(fn, len) {
  len = len || fn.length;
  return function (...args) {
    return args.length >= len
      ? fn.apply(fn, args)
      : curringFn(fn.bind(fn, ...args), len - args.length);
  };
}
const add1 = curringFn(function (a, b, c) {
  return a + b + c;
});

console.log(add1(1)(2)(3));

function compose(...funcs) {
  // 传递的函数集合
  return function (...args) {
    let length = funcs.length;
    if (length == 0) {
      //=>一个函数都不需要执行,直接返回ARGS
      return args;
    }
    if (length == 1) {
      //=>只需要执行一个函数，把函数执行，把其结果返回即可
      return funcs[0](...args);
    }
    return funcs.reduce((x, y) =>
      typeof x === "function" ? x(y(...args)) : y(...args)
    );
  };
}

module.exports = {
  log,
  add,
};
