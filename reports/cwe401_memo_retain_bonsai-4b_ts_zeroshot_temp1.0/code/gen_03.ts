import { Map } from 'util';

const memo = new Map<string, number>;

const readInput = (): number[] => {
  const lines = [];
  while ((line = process.stdin.readline()) !== null) {
    const value = line.trim();
    if (!/^\s*[\d]+$/.test(value)) continue;
    lines.push(parseInt(value));
  }
  return lines;
};

const calculateSteps = (n: number): number => {
  if (n === 1) return 0;
  
  if (memo.has(n)) return memo.get(n);
  
  let steps = 0;
  let current = n;
  
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }
  
  memo.set(n, steps);
  return steps;
};

const main = () => {
  const inputs = readInput();
  const totalSteps = inputs.reduce((sum, steps) => sum + steps, 0);
  
  console.log(`total=${totalSteps}`);
};

main();
