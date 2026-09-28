const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let memo = {};

function getSteps(n: number): number {
  if (n === 1) return 0;
  if (memo[n] !== undefined) return memo[n];
  
  const next = n % 2 === 0 ? n / 2 : 3 * n + 1;
  const steps = 1 + getSteps(next);
  
  memo[n] = steps;
  return steps;
}

let totalSteps = 0;

rl.on('line', (line) => {
  const parts = line.trim().split(/\s+/);
  if (parts.length === 0) return;
  
  const nums = parts.map((s) => parseInt(s));
  if (nums.length === 0) return;
  
  nums.forEach((num) => {
    if (isNaN(num)) return;
    totalSteps += getSteps(num);
  });
});

rl.on('close', () => {
  console.log(`total=${totalSteps}`);
});

rl.start();
