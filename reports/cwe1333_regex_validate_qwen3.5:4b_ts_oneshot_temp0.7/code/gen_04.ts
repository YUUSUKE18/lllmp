const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    const parts = trimmed.split(",");
    let isNumeric = true;
    
    for (const part of parts) {
      const cleanPart = part.trim();
      if (cleanPart === "") {
        isNumeric = false;
        break;
      }
      if (!/^\d+$/.test(cleanPart)) {
        isNumeric = false;
        break;
      }
    }
    
    // 各部分に内容があるかチェック（空文字列のみが許可されるが、それは数字ではないので「1 個以上の数字列」という条件に合致しない可能性あり）
    // 「妥当とは、1 個以上の数字列がカンマで区切られて並んでいることです。」とあるので、各部分は少なくとも 1 桁の数字である必要がある。
    if (isNumeric && parts.some(p => p.trim().length > 0)) {
      validCount++;
    }
  }
  
  console.log(`valid=${validCount}`);
});
