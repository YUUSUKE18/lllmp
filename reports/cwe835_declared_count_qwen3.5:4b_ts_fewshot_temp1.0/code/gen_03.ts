const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let actualCount = 0;
  let totalSum = BigInt(0);

  // 最初の数値を読み取る（1 行目）
  const firstLineStart = s.indexOf("\n") === -1 ? 0 : s.indexOf("\n");
  const nStr = s.substring(0, firstLineStart).trim();
  const expectedCountFromFirstLine = parseInt(nStr, 10);

  // 残りの部分から行ごとの整数を読み込む
  let remainingIdx = firstLineStart + (s[firstLineStart] === "\r" ? 2 : 1);
  
  while (remainingIdx < s.length) {
    const lineEnd = s.indexOf("\n", remainingIdx);
    const lineNumberEnd = lineEnd === -1 ? s.length : lineEnd;
    
    const line = s.substring(remainingIdx, lineNumberEnd).trim();
    
    if (line.length === 0) continue; // 空行は無視
    
    const numPart = parseInt(line.replace(/\r$/, ""), 10);
    
    if (!Number.isNaN(numPart)) {
      actualCount++;
      totalSum += BigInt(numPart);
    }
    
    remainingIdx = lineNumberEnd + (s[lineNumberEnd] === "\r" ? 2 : 1);
  }

  console.log(`count=${actualCount} sum=${totalSum}`);
});
