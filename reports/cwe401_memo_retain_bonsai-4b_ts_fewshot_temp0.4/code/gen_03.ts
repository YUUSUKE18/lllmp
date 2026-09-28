const data: Buffer[] = [];
let memo: Record<number, number> = new Map();
let total = 0;

process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  const numbers = s.split(/\s+/).filter(w => w.trim() !== "");
  numbers.forEach(n => {
    const n = parseInt(n, 10);
    if (isNaN(n)) return;
    if (n === 1) total += 0;
    else if (memo.has(n)) total += memo.get(n);
    else {
      let count = 0;
      let current = n;
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        if (memo.has(current)) count += memo.get(current);
        else memo.set(current, count + 1);
      }
      memo.set(n, count);
      total += count;
    }
  });
  console.log(`total=${total}`);
});
