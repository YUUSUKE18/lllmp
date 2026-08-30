const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const seen = new Set<number>();
  let count = 0;
  let sum = 0n; // 64bit整数を扱うためBigIntを使用

  for (const part of parts) {
    // 空白を除去
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェック
    if (!Number.isNaN(num)) {
      const nBigInt = BigInt(num);
      if (!seen.has(nBigInt)) {
        seen.add(nBigInt);
        count++;
        sum += nBigInt;
      }
    }
  }

  console.log(`count=${count} sum=${sum.toString()}`);
});
