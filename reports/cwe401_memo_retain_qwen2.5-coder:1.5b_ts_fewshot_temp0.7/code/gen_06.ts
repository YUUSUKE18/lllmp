const memo = new Map<number, number>();
let total = 0;

for (const line of process.stdin) {
  const n = parseInt(line.trim(), 10);
  if (n === 0) break;
  let count = 0;
  while (n !== 1) {
    if (memo.has(n)) {
      count += memo.get(n);
      break;
    }
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    count++;
  }
  total += count;
  memo.set(n, count);
}

console.log(`total=${total}`);
