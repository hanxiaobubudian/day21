/*
 * @Description: 
 * @Author: yudandan
 * @Date: 2021-03-05 09:55:12
 * @LastEditors: yudandan
 * @LastEditTime: 2021-03-05 15:34:30
 */

//  const expect = require('chai').expect;
 const task = require('../task');
 // 固定参数
//  const expect = require("chai").expect;
//  console.log(expect)

const assert = require("assert");

 


 describe('测试task.js', function() {
     describe('测试log函数', function() {
         it('应该输出12', function() {
             if(task.log(1, 2) !== '12') {
                 throw new Error('结果错误。')
             }
         });
     });

     describe('测试add函数', function() {
        it('应该输出:1+2=3', function() {
            if(task.add(1, 2) !== 3) {
                throw new Error('结果错误。')
            }
        });
        it('应该输出:+2=4', function() {
            if(task.add(2, 2) !== 4) {
                throw new Error('结果错误。')
            }
        });
        it('应该输出:+2=4', function() {
            if(task.add(8, 2) !== 10) {
                throw new Error('结果错误。')
            }
        });
        it('应该输出:+2=4', function() {
            if(task.add(21, 2) !== 23) {
                throw new Error('结果错误。')
            }
        });
        // it('应该输出:1.4+2=3.4', function() {
        //     if(expect(task.add(1.4, 2)).to.be.equal(3.4)) {
        //         throw new Error('结果错误。')
        //     }
        // });
    });

    describe('#indexOf()', function() {
        it("should return -1 when the value is not present", function() {
            assert.equal([1, 2, 3].indexOf(2), -1);
        });
    });
 });