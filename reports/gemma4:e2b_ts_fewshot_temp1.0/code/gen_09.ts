const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const seen = new Set<string>();
  let count = 0;
  let sum = 0n; // 64bit整数 (BigInt) で合計を計算

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェック
    if (!Number.isNaN(num)) {
      const strNum = String(num); // 再度文字列化して重複チェックに使用

      if (!seen.has(strNum)) {
        seen.add(strNum);
        count++;
        // 合計を BigInt で計算
        sum += BigInt(num);
      }
    }
  }

  console.log(`count=${count} sum=${sum.toString()}`);
});
