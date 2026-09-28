const input = process.stdin.read().split('\n').filter(line => line.trim() !== '').map(line => parseInt(line, 10));

const memo = new Map<number, number>();

function computeSteps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n);
  
  let steps = 1; // 1回の手数
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
}

const totalSteps = input.reduce((sum, n) => sum + computeSteps(n), 0);

console.log(`total=${totalSteps}`);
