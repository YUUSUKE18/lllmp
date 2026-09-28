const fs = require('fs');
const readline = require('readline');

const R = 64;
const MAX = 10000000; // 64bit 整数範囲内に収まります

const memo: { [n: number]: number } = {};

let input: string[];

let rl: readline.Interface;

function calc(n: number): number {
  if (n <= 1) return 0;
  if (memo[n]) return memo[n];
  
  let steps = 0;
  let current = n;
  
  while (current > 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }
  
  memo[n] = steps;
  return steps;
}

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let line: string;

while ((line = rl.stdin.readline()) !== null) {
  const tokens = line.trim().split(/\s+/).filter(token => token.length > 0);
  if (tokens.length === 0) continue;
  
  const nums: number[] = tokens.map(token => parseInt(token, 10));
  if (nums.length === 0) continue;
  
  const total = nums.reduce((sum, n) => sum + calc(n), 0);
  console.log(`${total}`);
}

rl.close();
