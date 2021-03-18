/*
 * @Description: promise
 * @Author: yudandan
 * @Date: 2021-03-18 15:31:11
 * @LastEditors: yudandan
 * @LastEditTime: 2021-03-18 17:18:25
 */

const { reject } = require('lodash');
const { resourceLimits } = require('worker_threads');

// const promise = new Promise((resolve, reject) => {
//     // 成功时调用
//     resolve('111');
//     //   失败时调用
//     reject('error');
// });

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve('成功1'), ms);
    });
}

// timeout(3000)
//     .then((value) => {
//         console.log('成功的值===', value);
//     })
//     .catch((err) => {
//         console.log('error===', err);
//     });
// function timeout2(ms) {
//     return new Promise((resolve, reject) => {
//         // setTimeout(resolve(timeout(1000)), 1000);
//         setTimeout(resolve(1), 1000);
//     });
// }
// timeout2()
//     .then((result) => {
//         console.log('result===', result);
//         // return result * 2
//         return new Promise((resolve, reject) => {
//             resolve(8)
//         })
//     })
//     .then(result2 => {
//         console.log('result2===', result2)
//         return result2 ** 2
//     }, err => {
//         console.log('哈哈哈err===', err)
//     })
//     .then(result => {
//         console.log('result3===', result);
//     })
//     .catch((err) => {
//         console.log('error===', err);
//     });

// let promise = new Promise((resolve, reject) => {
//     console.log('promise');
//     resolve();
// });
// promise.then(() => {
//     console.log('resolve');
// });
// console.log('hi');

// const getJSON = function(url) {
//     const promise = new Promise((resolve, reject) => {
//         const handler = function() {
//             if(this.readyState !== 4) {
//                 return;
//             }
//             if(this.status === 200) {
//                 resolve(this.response)
//             } else {
//                 reject(new Error(this.statusText))
//             }
//         }
//         const request = new XMLHttpRequest();
//         request.open('GET', url);
//         request.onreadystatechange = handler
//         request.response = 'json'
//         request.setRequestHeader('Accept', 'application/json')
//         request.send()
//     })
//     return promise;
// }

// getJSON('/posts.json').then((json) => {
//     console.log('json===', json)
// }, (error) => {
//     console.log('error', error)
// })

// finally -无论promise状态最终如何都会执行的操作
//  格式
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

// 手动实现Promise.allSettled
function myAllSettled(list) {
    const len = list.length;
    let resArr = new Array(len);
    return new Promise((resolve, reject) => {
        list.forEach((item, index) => {
            item.then(
                (res) => {
                    resArr[index] = {
                        'status': 'fulfilled',
                        'value': res,
                    };
                    // 所有的都执行完毕
                    if (index === len - 1) {
                        resolve(resArr);
                    }
                },
                (error) => {
                    resArr[index] = {
                        'status': 'rejected',
                        'error': error,
                    };
                    if (index === len - 1) {
                        resolve(resArr);
                    }
                }
            );
        });
    });
}
