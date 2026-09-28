import { Buffer } from "buffer";

const memo = new Map<number, number>();

process.stdin.on("data", (c: Buffer) => {
  const lines = c.toString("utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n)) continue;
    
    let count = 0;
    while (n !== 1) {
      if (n % 2 === 0) {
        n = n / 2;
      } else {
        n = 3 * n + 1;
      }
      count++;
    }
    
    memo.set(n, count);
  }
});

process.stdin.on("end", () => {
  let total = 0;
  for (const [n, c] of memo.entries()) {
    if (c !== undefined) total += c;
  }
  console.log(`total=${total}`);
});
