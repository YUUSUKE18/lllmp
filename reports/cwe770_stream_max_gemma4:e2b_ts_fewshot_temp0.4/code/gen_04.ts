const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    
    // 整数として解釈可能かチェックし、64bit範囲内か確認（ここではNumber型で十分だが、安全のため）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      validCount++;
      if (num > max) {
        max = num;
      }
    }
  }

  console.log(`count=${validCount} max=${max}`);
});
