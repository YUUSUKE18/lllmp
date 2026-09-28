const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  let memo = {};
  let totalHandcount = 0;
  
  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 1) continue;
    const n = parseInt(parts[0], 10);
    if (isNaN(n)) continue;
    
    if (n === 1) {
      totalHandcount += 0;
      continue;
    }
    
    if (memo[n]) continue;
    
    let current = n;
    let steps = 0;
    
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
      if (current > 2147483647 || current < -2147483648) break;
    }
    
    memo[n] = steps;
    totalHandcount += steps;
  }
  
  console.log(`total=${totalHandcount}`);
});
