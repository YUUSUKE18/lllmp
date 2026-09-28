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
    if (!isNaN(num)) {
      // 値が64bit整数に収まることを確認（TypeScript/JavaScriptのNumber型はIEEE 754倍精度であり、安全な整数範囲は2^53程度だが、ここでは入力値がその範囲内にあると仮定し、maxを更新する）
      if (num > max) {
        max = num;
      }
      validCount++;
    }
  }

  // count: 有効な整数の数
  // max: 最大値
  console.log(`count=${validCount} max=${max}`);
});
