// 解法を TypeScript で実装

import { readFileSync } from 'fs';

const data = readFileSync(process.stdin, 'utf-8');
const values = data.trim().split('\n').map(Number);

let target = parseInt(values[0], 10);
const pairs = 0;

// 2 行目以降の整数のうち、足して目標値になる 2 個の組（位置が異なる 2 個）の個数を求める
for (let i = 0; i < values.length - 1; i++) {
  for (let j = i + 1; j < values.length; j++) {
    if (values[i] + values[j] === target) {
      pairs++;
    }
  }
}

console.log(`pairs=${pairs}`);
