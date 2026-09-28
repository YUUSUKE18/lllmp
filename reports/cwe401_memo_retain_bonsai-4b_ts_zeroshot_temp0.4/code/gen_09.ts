const input = process.stdin;
const memo = new Map<number, number>([]); // memo: n -> steps to reach 1

let totalSteps = 0;

function stepsToOne(n: number): number {
  if (memo.has(n)) return memo.get(n);
  
  if (n === 1) return 0;
  
  if (n % 2 === 0) {
    const next = n / 2;
    memo.set(n, 1 + stepsToOne(next));
  } else {
    const next = 3 * n + 1;
    memo.set(n, 1 + stepsToOne(next));
  }
  
  return memo.get(n) ?? 0;
}

input.on('line', (line: string) => {
  const n = parseInt(line.trim(), 10);
  if (!n || isNaN(n)) return;
  
  totalSteps += stepsToOne(n);
});

console.log(`total=${totalSteps}`);
