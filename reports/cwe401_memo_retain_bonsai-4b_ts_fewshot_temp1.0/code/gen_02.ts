const data: Buffer[] = [];
let memo: Record<number, number> = new Map();
let total = 0;

process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let c = 0;
  for (const w of s.split(/\s+/)) if (w.trim() === "") continue;
  const n = parseInt(w, 10);
  if (isNaN(n) || n <= 0) continue;

  if (memo.has(n)) {
    c = memo.get(n);
  } else {
    let count = 0;
    let current = n;
    while (current > 0) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      count++;
    }
    memo.set(n, count);
  }
  total += count;
  console.log(`total=${total}`);
});
