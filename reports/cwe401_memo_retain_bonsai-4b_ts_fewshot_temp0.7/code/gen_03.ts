const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let results = new Map<number, number>(new Map());
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  const tokens = s.split(/\s+/);
  for (const t of tokens) if (t.trim() === "") continue;
  const n = parseInt(t, 10);
  if (isNaN(n)) continue;
  let count = 0;
  let current = n;
  while (current !== 1) {
    if (current % 2 === 0) current = current / 2;
    else current = 3 * current + 1;
    count++;
    if (current > 2147483648 || current < -2147483649) break;
  }
  if (current === 1) count = 0;
  results.set(n, count);
  const total = Array.from(results.values()).reduce((a, b) => a + b, 0);
  console.log(`total=${total}`);
});
