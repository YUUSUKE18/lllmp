import { Process } from 'readline';

const rl = new Process.stdin();
let target = parseInt(rl_line(), 10);

let numbers: number[] = [];

rl_line().forEach(line => {
  const value = parseInt(line, 10);
  if (!isNaN(value) && value >= 0 && value <= 2**63 - 1) {
    numbers.push(value);
  }
});

const pairs = numbers.length - numbers.filter(n => n === target).length;
console.log(`pairs=${pairs}`);
