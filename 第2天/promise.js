/*
 * @Description: promise
 * @Author: yudandan
 * @Date: 2021-03-18 15:31:11
 * @LastEditors: yudandan
 * @LastEditTime: 2021-04-26 23:15:05
 */

// const { reject } = require('lodash');
// const { resourceLimits } = require('worker_threads');

// const promise = new Promise((resolve, reject) => {
// 	// 成功时调用
// 	resolve('111');
// 	//   失败时调用
// 	reject('error');
// });

// function timeout(ms) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(resolve('成功1'), ms);
// 	});
// }

// timeout(3000)
// 	.then((value) => {
// 		console.log('成功的值===', value);
// 	})
// 	.catch((err) => {
// 		console.log('error===', err);
// 	});
// function timeout2(ms) {
// 	return new Promise((resolve, reject) => {
// 		// setTimeout(resolve(timeout(1000)), 1000);
// 		setTimeout(resolve(1), 1000);
// 	});
// }
// timeout2()
// 	.then((result) => {
// 		console.log('result===', result);
// 		// return result * 2
// 		return new Promise((resolve, reject) => {
// 			resolve(8);
// 		});
// 	})
// 	.then(
// 		(result2) => {
// 			console.log('result2===', result2);
// 			return result2 ** 2;
// 		},
// 		(err) => {
// 			console.log('哈哈哈err===', err);
// 		}
// 	)
// 	.then((result) => {
// 		console.log('result3===', result);
// 	})
// 	.catch((err) => {
// 		console.log('error===', err);
// 	});

let promise = new Promise((resolve, reject) => {
	console.log('promise');
	resolve();
});
promise.then(() => {
	console.log('resolve');
});
console.log('hi');

// const getJSON = function(url) {
// 	const promise = new Promise((resolve, reject) => {
// 		const handler = function() {
// 			if (this.readyState !== 4) {
// 				return;
// 			}
// 			if (this.status === 200) {
// 				resolve(this.response);
// 			} else {
// 				reject(new Error(this.statusText));
// 			}
// 		};
// 		const request = new XMLHttpRequest();
// 		request.open('GET', url);
// 		request.onreadystatechange = handler;
// 		request.response = 'json';
// 		request.setRequestHeader('Accept', 'application/json');
// 		request.send();
// 	});
// 	return promise;
// };

// getJSON('/posts.json').then(
// 	(json) => {
// 		console.log('json===', json);
// 	},
// 	(error) => {
// 		console.log('error', error);
// 	}
// );

// finally -无论promise状态最终如何都会执行的操作
// 格式;

/**
 * promise
 * .then
 * .catch
 * .finally
 */
// 手动实现promise.finally
Promise.prototype.myFinally = function(callback) {
	let P = this.constructor;
	return this.then(
		(value) => P.resolve(callback()).then(() => value),
		(error) =>
			P.resolve(callback()).then(() => {
				throw error;
			})
	);
};

// Promise.all()-把多个Promise实例包装成新的Promise实例
/**
 * 使用
 * Promise.all([p1,p2, p3, p4, ...])
 */

/**
 * Promise.race()
 */

// // 手动实现Promise.allSettled
// function myAllSettled(list) {
//     const len = list.length;
//     let resArr = new Array(len);
//     return new Promise((resolve, reject) => {
//         list.forEach((item, index) => {
//             item.then(
//                 (res) => {
//                     resArr[index] = {
//                         'status': 'fulfilled',
//                         'value': res,
//                     };
//                     // 所有的都执行完毕
//                     if (index === len - 1) {
//                         resolve(resArr);
//                     }
//                 },
//                 (error) => {
//                     resArr[index] = {
//                         'status': 'rejected',
//                         'error': error,
//                     };
//                     if (index === len - 1) {
//                         resolve(resArr);
//                     }
//                 }
//             );
//         });
//     });
// }

// 第1题：
// Promise.allSettled 返回执行promise的所有结果
// 手动实现Promise.allSettle
//  分析： 传入数组，返回 Promise， 执行每个promise  记录每种状态
Promise.prototype.myAllSettled = function(promiseArr) {
	const len = promiseArr.length;
	if (len > 0) {
		let returnArr = [];
		return new Promise((resolve, reject) => {
			promiseArr.forEach((item, index) => {
				item.then((res) => {
					returnArr.push({
						status: 'fulfilled',
						value: res,
					});
					if (index === len - 1) {
						resolve(returnArr);
					}
				}).catch((error) => {
					returnArr.push({
						status: 'rejected',
						error,
					});
					if (index === len - 1) {
						reject(returnArr);
					}
				});
			});
		});
	}
};

// 手动实现Promise.race
//  分析：传入数组，返回 Promise， 返回最先执行的那个index
Promise.prototype.myRace = function(promiseArr) {
	const len = promiseArr.length;
	if (len > 0) {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < len; i++) {
				let item = promiseArr[i];
				item.then((res) => {
					resolve(res);
				}).catch((error) => {
					reject(error);
				});
			}
		});
	}
};

// 手动实现Promise.all
//  分析：传入数组，返回 Promise， 知道执行失败的结果
Promise.prototype.myAll = function(promiseArr) {
	const len = promiseArr.length;
	if (len > 0) {
		let returnArr = [];
		return new Promise((resolve, reject) => {
			for (let i = 0; i < len; i++) {
				let item = promiseArr[i];
				item.then((res) => {
					returnArr.push({
						status: 'fulfiled',
						value: res,
					});
					if (index === len - 1) {
						resolve(returnArr);
					}
				}).catch((error) => {
					reject(error);
				});
			}
		});
	}
};

//  手动实现promise
// 原理：使用回调函数，把回调函数封装在内部，使用上一直通过then方法链式调用。
// 极简的实现
class MyPromise {
	callbacks = []; // 成功执行函数
	state = 'pending'; // 状态
	value = null; // 保存结果
	constructor(fn) {
		fn(this._resolve.bind(this));
	}
	then(onFulfilled) {
		if (this.state === 'pending') {
			// 在resolve之前
			this.callbacks.push(onFulfilled);
		} else {
			// 在resolve之后，直接执行回调，返回结果
			onFulfilled(this.value);
		}
		this.callbacks.push(onFulfilled);
		return this;
	}
	_resolve(value) {
		this.state = 'fulfilled';
		this.value = value;
		this.callbacks.forEach((fn) => fn(value));
	}
}

// let p = new MyPromise((resolve) => {
//     // setTimeout(() => {
//     //     console.log('done');
//     //     resolve('5s');
//     // });
//     console.log('同步执行')
//     console.log('tong bu zhi xing')
// })
// p.then((tip) => {
//     console.log('tip1', tip);
//     return '99'
// }).then((val) => {
//     console.log('tip2', val)
// });

// setTimeout(() => {
//     p.then(tip => {
//         console.log('then3', tip)
//     })
// })

// promise1 = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         resolve('promise1_resolve_data');
//     },1000)
// })
// console.log(promise1);
// promise2 = promise1.then((data) => {
//     console.log('promise2---', data);
//     return 'promise2';
// })
// console.log(promise2);
// promise3 = promise1.then((data) => {
//     console.log('promise3---', data);
//     return 'promise3';
// })
// console.log(promise3);
// setTimeout(() => {
//     console.log('--promise1--', promise1);
//     console.log('--promise2--', promise2);
//     console.log('--promise3--', promise3);
// },3000)

// function Foo() {
// 	getName = function() {
// 		console.log(1);
// 	};
// 	return this;
// }
// Foo.getName = function() {
// 	console.log(2);
// };
// Foo.prototype.getName = function() {
// 	console.log(3);
// };
// var getName = function() {
// 	console.log(4);
// };
// function getName() {
// 	console.log(5);
// }

// //请写出以下输出结果：
// Foo.getName(); // 2
// getName(); // 4
// Foo().getName(); // 报错
// getName(); // 4
// new Foo.getName(); // 2
// new Foo().getName(); // 3
// new new Foo().getName(); // 3
