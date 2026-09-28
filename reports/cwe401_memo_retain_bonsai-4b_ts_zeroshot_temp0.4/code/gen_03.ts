const memo = new Map<number, number>();

const process = (input: string): string => {
  const n: number = parseInt(input.trim(), 10);
  if (isNaN(n) || n <= 0) return "";

  if (n === 1) return "0";

  const result = 0;
  let current = n;

  while (current !== 1) {
    if (memo.has(current)) {
      result += memo.get(current);
      continue;
    }

    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }

    memo.set(current, result + 1);
  }

  return `total=${result}`;
};

process.stdin.on('line', (line) => {
  const n = parseInt(line.trim(), 10);
  if (isNaN(n) || n <= 0) {
    process.stdin.next();
    return;
  }

  const handCount = process(n);
  process.stdin.next();
});

process.stdin.on('end', () => {
  const total = process.stdin.read().trim();
  console.log(total);
});
