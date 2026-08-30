const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;

  for (const line of lines) {
    if (!line.trim()) continue;
    
    const parts = line.split(",");
    const trimmedParts = parts.map(p => p.trim());
    
    if (trimmedParts.length === 0) continue;
    
    let isNumeric = true;
    for (const part of trimmedParts) {
      const num = parseInt(part, 10);
      if (Number.isNaN(num)) {
        isNumeric = false;
        break;
      }
      // 整数であるか確認: 文字列が数字のみで構成されているか
      if (!/^-?\d+$/.test(part)) {
        isNumeric = false;
        break;
      }
    }
    
    if (isNumeric) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
