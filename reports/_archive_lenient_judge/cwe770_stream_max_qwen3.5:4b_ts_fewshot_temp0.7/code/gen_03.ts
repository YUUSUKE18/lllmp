const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max: number | undefined = undefined;
  
  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    
    try {
      // parseInt は文字列の先頭から数値部分を読み込むため、空白が含まれていても解析されるが、ここではtrimを先に実施した。
      const n = Number.parseInt(w, 10);
      
      // NaN の場合のみスキップ (例: "abc" -> NaN)
      if (!Number.isNaN(n)) {
        count++;
        
        if (max === undefined || n > max) {
          max = n;
        }
      }
    } catch (_e) {
      // Number.parseInt は通常 throws しないが、安全のために考慮する。
      // ただし、上記の解析ロジックでは NaN のチェックのみで十分であることが一般的だが、補足として記述する。
      if (typeof n !== "number" || !Number.isFinite(n)) {
        continue; 
      }
    }
  }

  console.log(`count=${count} max=${max}`);
});
