const data: Buffer[] = [];
let memo: Record<number, number> = {};

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  
  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    
    if (n === 1) {
      total += 0;
    } else if (memo[n] !== undefined) {
      total += memo[n];
    } else {
      let steps = 0;
      let current = n;
      
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        
        if (memo[current] !== undefined) {
          steps += memo[current];
        } else if (current > 2147483647 || current < -2147483648) {
          break;
        }
        
        memo[current] = steps + 1;
        steps += 1;
      }
      
      memo[n] = steps;
      total += memo[n];
    }
  }
  
  console.log(`total=${total}`);
});
