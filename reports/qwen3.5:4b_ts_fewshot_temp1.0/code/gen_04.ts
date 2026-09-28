const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const tokens = s.split(/[,,\s]+/);
  const uniqueValues = new Set<number>();
  for (const token of tokens) {
    if (token.trim() === "") continue;
    let n: number;
    try {
      n = parseInt(token, 10);
      if (!Number.isNaN(n)) {
        uniqueValues.add(n);
      }
    } catch {
      // 無視
    }
  }
  
  const sortedUnique = Array.from(uniqueValues).sort((a, b) => a - b);
  let count = sortedUnique.length;
  let sum: bigint = BigInt(0);
  for (const val of sortedUnique) {
    if (val >= Number.MAX_SAFE_INTEGER || val <= Number.MIN_SAFE_INTEGER) {
      // 64bit 範囲を超える値は、sum を更新しても精度の問題やオーバーフローの可能性があります
      // しかし、問題文に「合計は 64bit 整数の範囲に収まります」とあるので
      // この分岐は条件を満たす入力が与えられる限り不要です。
      // 安全のためにそのまま足し込みます。
      sum += BigInt(val);
    } else {
      sum += BigInt(val);
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
