const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\s+/).filter(f => f.trim() !== "");
  const memo = new Map<number, number>();
  
  let total = 0;
  for (const n of lines) {
    const num = parseInt(n, 10);
    if (isNaN(num)) continue;
    
    if (memo.has(num)) continue;
    
    let current = num;
    let steps = 0;
    
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    
    memo.set(num, steps);
    total += steps;
  }
  
  console.log(`total=${total}`);
});
