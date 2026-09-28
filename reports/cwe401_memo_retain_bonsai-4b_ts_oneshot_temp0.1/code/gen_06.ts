const data: Buffer[] = [];
let memo: Record<number, number> = new Map();
let total = 0;

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  
  lines.forEach(line => {
    const n = parseInt(line, 10);
    if (isNaN(n)) return;
    
    if (n === 1) {
      total += 0;
      return;
    }
    
    if (memo.has(n)) {
      total += memo.get(n);
      return;
    }
    
    let current = n;
    let steps = 0;
    
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
      
      if (current > 1000000000000000000) {
        break;
      }
    }
    
    memo.set(n, steps);
    total += steps;
  });
  
  console.log(`total=${total}`);
});
