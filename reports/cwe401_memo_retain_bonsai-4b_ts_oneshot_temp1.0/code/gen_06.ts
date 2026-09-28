const memo: Record<number, number> = new Map();
const data: Buffer[] = [];

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines: number[] = s.split(/\s+/).filter(line => !line.trim()).map(line => parseInt(line, 10));
  let total = 0;
  
  for (const n of lines) {
    if (n === 1) continue; // 1という値は0
    const steps = computeSteps(n, memo);
    total += steps;
  }
  
  console.log(`total=${total}`);
});

function computeSteps(n: number, memo: Record<number, number>): number {
  if (memo.has(n)) return memo.get(n);
  
  let current = n;
  let steps = 0;
  
  // 1を達成まで繰り返すまでの操作
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
});
