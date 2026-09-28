const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.trim().split("\n");
  if (lines.length === 0) {
    console.log(`valid=0`);
    return;
  }

  for (const line of lines) {
    if (line.length === 0) continue;
    
    const parts = line.split(",");
    let hasNonDigit = false;
    for (const part of parts) {
      // カンマは区切り文字として許容されるが、数字ではない文字が存在するかチェック
      const trimmedPart = part.trim();
      if (!/^\d+$/.test(trimmedPart)) {
        hasNonDigit = true;
        break;
      }
    }
    
    // 空行も数えない（既にcontinue）
    // カンマの区切りが適切か、つまり全要素が数字のみかどうか
    if (!hasNonDigit) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
