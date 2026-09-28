const data: Buffer[] = [];
let memo: Map<number, number> = new Map();

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});

process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines: Buffer[] = s.split(/\s+/).filter(line => line.trim() !== "");
  
  let total = 0;
  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    
    if (memo.has(n)) {
      total += memo.get(n);
      continue;
    }
    
    let current = n;
    let steps = 0;
    
    if (current === 1) {
      memo.set(n, 0);
    } else {
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        steps++;
        if (current > 1 && current > 2048384567) break; // 避ける infinite循环
        memo.set(current, steps);
      }
    }
    
    memo.set(n, steps);
    total += steps;
  }
  
  console.log(`total=${total}`);
});
