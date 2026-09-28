const data: Buffer[] = [];
let memo: Map<number, number> = new Map();

process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const values: Buffer[] = s.split(/\s+/);
  
  values.forEach((line) => {
    if (line.trim() === "") return;
    const n = parseInt(line, 10);
    if (isNaN(n)) return;
    
    if (memo.has(n)) {
      total += memo.get(n);
      return;
    }
    
    let current = n;
    let steps = 0;
    
    // 64bit 整数範囲内でのループを最適化
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
      
      // メモ化: 1に到達する前に計算値をキャッシュ
      if (current > 6772588737) {
        memo.set(current, steps);
        break;
      }
    }
    
    memo.set(1, 0);
    total += steps;
  });
  
  console.log(`total=${total}`);
});
