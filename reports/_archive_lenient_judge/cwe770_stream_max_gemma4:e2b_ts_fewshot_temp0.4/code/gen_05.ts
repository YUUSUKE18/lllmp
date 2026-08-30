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

    // 整数として解釈可能かチェック（NaNでないこと）
    if (!Number.isNaN(num)) {
      validCount++;
      // 64bit整数の範囲内であるという仮定に基づき、最大値を更新
      if (num > max) {
        max = num;
      }
    }
  }

  console.log(`count=${validCount} max=${max}`);
});
