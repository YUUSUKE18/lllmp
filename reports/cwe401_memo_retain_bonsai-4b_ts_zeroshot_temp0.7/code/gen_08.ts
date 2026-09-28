const memo = new Map<number, number>(());

const readInput = (): number[] => {
  const lines = [];
  while ((line = process.stdin.readline()) !== null) {
    const val = line.trim();
    if (!/^\s*-\s*$/.test(val)) {
      const num = parseInt(val);
      if (num !== null && num >= 1) {
        lines.push(num);
      }
    }
  }
  return lines;
};

const solve(n: number): number => {
  if (memo.has(n)) return memo.get(n);
  if (n === 1) return 0;
  
  let steps = 1;
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
  if (inputs.length === 0) {
    console.log("0");
    return;
  }
  
  let totalSteps = 0;
  inputs.forEach(n => {
    totalSteps += solve(n);
  });
  
  console.log(`total=${totalSteps}`);
};

main();
