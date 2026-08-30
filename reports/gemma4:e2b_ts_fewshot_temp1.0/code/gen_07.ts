const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  const seen = new Set<string>();
  let count = 0;
  let sum = 0n; // 64bit整数を扱うためBigIntを使用

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能かチェックし、重複をチェック
    if (!Number.isNaN(num)) {
      const numStr = String(num);
      if (!seen.has(numStr)) {
        seen.add(numStr);
        count++;
        sum += BigInt(num);
      }
    }
  }

  console.log(`count=${count} sum=${sum.toString()}`);
});
