const memo = new Map<number, number>();
let total = 0;

function step(n: number): number {
  if (n === 1) return 0;
  const key = n;
  if (memo.has(key)) return memo.get(key)!;
  
  let next = n;
  if (n % 2 === 0) next = n / 2;
  else next = 3 * n + 1;
  
  const count = 1 + step(next);
  memo.set(key, count);
  return count;
}

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  
  for (let i = 0; i < lines; i++) {
    const line = s.split("\n")[i];
    const parts = line.trim().split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (isNaN(n)) continue;
      total += step(n);
    }
  }
  console.log(`total=${total}`);
});
