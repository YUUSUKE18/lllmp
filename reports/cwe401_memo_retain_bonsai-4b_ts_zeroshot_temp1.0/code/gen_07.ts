const memo = new Map<number, number>([]);

let total = 0;

const applyFn = (n: number): number => {
  if (n <= 0) return 0;
  if (n === 1) return 0;
  
  const prev = memo.get(n);
  if (prev !== undefined) return prev;
  
  const result = (n % 2 === 0) ? n / 2 : 3 * n + 1;
  memo.set(n, result + 1);
  
  return result;
};

const readInput = () => {
  const line = process.stdin.readline();
  return line ? parseInt(line.trim(), 10) : null;
};

const processAllQueries = () => {
  while ((const n = readInput()) !== null) {
    if (n % 2 === 0) {
      const steps = applyFn(n);
    } else {
      const steps = applyFn(n);
    }
    total += steps;
  }
};

processAllQueries();
console.log(`total=${total}`);
