"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepObjectMerge = deepObjectMerge;
exports.createHash = createHash;

/* eslint-disable consistent-return */

/* eslint-disable no-param-reassign */

/* eslint-disable guard-for-in */

/* eslint-disable no-restricted-syntax */

/**
 * 深度合并两个对象
 * @param {*} FirstOBJ 对象1
 * @param {*} SecondOBJ 对象2
 */
function deepObjectMerge(FirstOBJ, SecondOBJ) {
  for (const key in SecondOBJ) {
    FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]' ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
  }

  return FirstOBJ;
}
/**
 * 创建一个随机hash值
 * @param {*} hashLength hash值的长度
 */


function createHash(hashLength) {
  if (!hashLength || typeof Number(hashLength) !== 'number') {
    return;
  }

  const ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const hs = [];
  const hl = Number(hashLength);
  const al = ar.length;

  for (let i = 0; i < hl; i++) {
    hs.push(ar[Math.floor(Math.random() * al)]);
  }

  return hs.join('');
}