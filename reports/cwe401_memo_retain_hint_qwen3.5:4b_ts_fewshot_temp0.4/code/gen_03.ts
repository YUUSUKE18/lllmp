const memo = new Map<number, number>();
let total = 0;

function solve(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let steps = 0;
  while (n !== 1) {
    if (n % 2 === 0) n = n / 2;
    else n = 3 * n + 1;
    steps++;
  }
  memo.set(n, steps);
  return steps;
}

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  
  for (let i = 0; i < lines; i++) {
    const line = s.split("\n")[i];
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    
    total += solve(n);
  }
  
  console.log(`total=${total}`);
});
