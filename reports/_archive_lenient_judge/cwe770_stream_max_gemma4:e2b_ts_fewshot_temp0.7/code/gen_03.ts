const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈でき、かつ64bit範囲内（安全のため）のチェック
    if (!isNaN(num) && Number.isInteger(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 要素数と最大値を指定形式で出力
  console.log(`count=${count} max=${max}`);
});
