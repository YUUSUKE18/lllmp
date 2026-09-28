const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max: bigint | undefined = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    try {
      const n = parseInt(token, 10);
      
      // NaN のチェック（parseInt が文字列の先頭が数値でない場合もナンス返す）
      if (Number.isNaN(n) || !String(Number(n)).startsWith("-")) continue;

      count++;
      
      let current: bigint = BigInt(n);
      if (max === undefined || current > max) {
        max = current;
      }
    } catch (_) {} // 解析エラーも無視する（ただし parseInt は通常 throwしないが安全のため）
  }

  console.log(`count=${count} max=${Number.isNaN(max) ? "" : Number(String(Number(max)))}`); 
});
