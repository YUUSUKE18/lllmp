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

    // 整数として解釈できるかチェックし、64bit範囲内か確認（ここでは安全のためNumber型で扱う）
    if (!isNaN(num)) {
      // 64bit整数の範囲に収まることを前提とするが、ここでは単純に最大値を求める
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  console.log(`count=${count} max=${max}`);
});
