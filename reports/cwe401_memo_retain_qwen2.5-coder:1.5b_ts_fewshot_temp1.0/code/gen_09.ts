const memo = new Map<number, number>();

const getTotal = (n: number): number => {
  if (memo.has(n)) return memo.get(n)!;
  if (n === 1) return 0;
  const result = getTotal(n % 2 === 0 ? n / 2 : 3 * n + 1);
  memo.set(n, result + 1);
  return result + 1;
};

const total = 0;
let line = process.stdin.read();
while (line) {
  const numbers = line.split(/\s+/);
  for (const num of numbers) {
    const n = parseInt(num, 10);
    if (!isNaN(n) && n > 0) {
      total += getTotal(n);
    }
  }
  line = process.stdin.read();
}

console.log(`total=${total}`);
