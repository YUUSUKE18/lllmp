const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "").length;
  let memo = {};
  let total = 0;
  for (const line of s.split(/,\s*/)) {
    const n = parseInt(line.trim(), 10);
    if (isNaN(n)) continue;
    if (n === 1) continue;
    if (memo[n] !== undefined) continue;
    let count = 0;
    let current = n;
    while (true) {
      const next = current % 2 === 0 ? current / 2 : 3 * current + 1;
      if (next > 60) break;
      if (memo[next] !== undefined) {
        memo[current] = memo[next];
        break;
      }
      memo[current] = next;
      current = next;
      count++;
    }
    if (count > 0) total += count;
  }
  console.log(`total=${total}`);
});
