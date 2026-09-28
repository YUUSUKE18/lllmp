const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を数値に変換し、エラーが発生した場合は無視する
    const numStr = parseInt(token, 10); 
    if (isNaN(numStr) || !Number.isFinite(numStr)) continue;

    count++;
    if (!maxVal || numStr > maxVal) {
      maxVal = numStr;
    }
  }

  // 有効な数値がなければ、最大値は null を保持する（またはデフォルトを定義）
  const finalMax = maxVal ?? -Infinity; 

  console.log(`count=${count} max=${finalMax}`);
});
