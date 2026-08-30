const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    
    // Leading/trailing whitespace を除去し、整数として解析する
    const trimmed = f.trim();
    const n = parseInt(trimmed);
    
    // NaN の場合は無視（例: "abc", "" など）
    if (Number.isNaN(n)) {
      continue;
    }

    count++;
    if (maxVal === null || n > maxVal) {
      maxVal = n;
    }
  }

  // 有効な要素がない場合、count は 0, maxVal は undefined に残るが
  // 仕様では「整数列を受け取る」とあり、空の場合は count=0 で出力するのが妥当。
  console.log(`count=${count} max=${maxVal}`);
});
