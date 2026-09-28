const data: Buffer[] = [];
let memo: Record<number, number> = new Map();
let total = 0;

process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  
  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    
    if (n === 1) {
      total += 0;
    } else if (memo.has(n)) {
      total += memo.get(n);
    } else {
      let current = n;
      let steps = 0;
      
      // 64bit 整数範囲で計算（最大値は10^18以下で安全）
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        steps++;
        
        // 3n+1 が1になる場合、停止
        if (current > 10**18) break;
        
        // 64bit 整数では収まりますが、安全な上限を設定
        if (current > 2**63) break;
        
        memo.set(current, steps);
      }
      
      // 1に到達するまでの手数を記録
      memo.set(1, 0);
      
      total += steps;
    }
  }
});

console.log(`total=${total}`);
