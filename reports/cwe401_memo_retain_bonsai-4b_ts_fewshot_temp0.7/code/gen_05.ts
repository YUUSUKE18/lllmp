const data: Buffer[] = [];
let memo = new Map<number, number>(());

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const tokens = s.split(/\s+/);
  
  for (const token of tokens) {
    if (!token.trim()) continue;
    const n = parseInt(token, 10);
    if (isNaN(n)) continue;
    
    if (memo.has(n)) continue;
    
    let current = n;
    let steps = 0;
    
    while (current !== 1) {
      current = current % 2 === 0 ? current / 2 : 3 * current + 1;
      steps++;
    }
    
    memo.set(n, steps);
    total += steps;
  }
  
  console.log(`total=${total}`);
});
