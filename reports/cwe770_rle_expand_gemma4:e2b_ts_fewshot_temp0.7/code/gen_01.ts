const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let sum = 0n; // 合計は64bit整数として扱うためBigIntを使用
  const regex = /^(\d+):(\d+)$/;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const match = trimmedPart.match(regex);
    if (match) {
      const value = parseInt(match[1], 10);
      const countVal = parseInt(match[2], 10);
      
      if (!isNaN(value) && !isNaN(countVal) && countVal >= 0) {
        // 要素数: value * countVal
        const currentCount = value * countVal;
        // 合計: value * countVal
        const currentSum = BigInt(value) * BigInt(countVal);
        
        count += currentCount;
        sum += currentSum;
      }
    }
  }

  console.log(`count=${count} sum=${sum.toString()}`);
});
