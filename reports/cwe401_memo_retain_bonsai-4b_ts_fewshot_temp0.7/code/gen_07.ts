const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const results = new Map<string, number>();
  
  for (const line of lines) {
    const tokens = line.split(/\s+/);
    for (const token of tokens) {
      if (token.trim() === "") continue;
      const n = parseInt(token, 10);
      if (isNaN(n)) continue;
      
      let count = 0;
      let current = n;
      
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        if (results.has(current)) count += results.get(current);
        else results.set(current, 0);
        count++;
      }
      if (current === 1) results.set(1, count);
    }
  }
  
  let total = 0;
  for (const [n, result] of results) {
    if (result !== undefined) total += result;
  }
  
  console.log(`total=${total}`);
});
