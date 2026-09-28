const input = process.stdin;
const memo: { [n: number]: number } = {};

let total = 0;

function getSteps(n: number): number {
  if (n === 1) return 0;
  if (memo[n] !== undefined) return memo[n];
  
  let steps = 1; // 1つ目の手数（1から到達まで）
  let current = n;
  
  while (current !== 1) {
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

input.lines.forEach(line => {
  const n = parseInt(line.trim(), 10);
  if (isNaN(n) || n <= 0) {
    return;
  }
  
  total += getSteps(n);
});

console.log(`total=${total}`);
