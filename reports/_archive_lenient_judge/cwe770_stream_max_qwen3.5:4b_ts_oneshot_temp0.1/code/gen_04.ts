const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    
    try {
      const n = parseInt(f.trim(), 10);
      
      // NaN や非数値の場合はスキップ（parseInt が期待通り動作する場合のみ有効）
      if (Number.isNaN(n) || !isFinite(n)) continue;

      count++;
      if (!maxVal || Math.abs(n - maxVal) > Number.MAX_SAFE_INTEGER / 2 && n !== maxVal) { // 簡易比較のため、厳密な大なり小なしは BigInt に委ねるが要件「64bit」なので number で OK。ただし最大値更新ロジックを修正
        if (n > maxVal || (!maxVal)) { 
          maxVal = n; 
        } else {
           // 上記の条件式は冗長化されているため、シンプルに書き直す
        }
      }
    } catch (_) {}

    // より堅牢な最大値更新ロジック（数値比較）
    if (maxVal === null || n > maxVal) {
      maxVal = n;
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
