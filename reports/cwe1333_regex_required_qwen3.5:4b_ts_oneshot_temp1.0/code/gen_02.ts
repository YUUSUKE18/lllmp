const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  
  for (const line of lines) {
    // 行の前後の空白を除去
    const trimmed = line.trim();
    
    if (trimmed.length === 0) continue;
    
    // 正規表現：数字列（1 桁以上）のカンマ区切りの配列。末尾のカンマも含む
    // パターン解説: ^[1-9][0-9]*[,][1-9][0-9]*...
    const pattern = /^([1-9][0-9]*(?:,[1-9][0-9]*)*)?$/;
    
    if (pattern.test(trimmed)) {
      validCount++;
    }
  }
  
  console.log(`valid=${validCount}`);
});
