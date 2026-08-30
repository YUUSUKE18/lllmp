const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  if (!s) {
    console.log(`count=0 sum=0`);
    return;
  }

  const parts = s.split(',');
  const uniqueNumbers = new Set<number>();
  let sum: bigint = 0n; // 合計を64bit整数として扱うためBigIntを使用 (必要に応じて、最終結果がNumber型に収まる場合はNumberでも可だが、安全のため)

  for (const part of parts) {
    // 前後の空白を削除
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    // 整数として解析を試みる
    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できたか、かつ重複していないかチェック
    if (!Number.isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  // 重複を除いた個数を計算
  const count = uniqueNumbers.size;

  // 合計を計算 (Setから値を取り出して合計する)
  let totalSum: bigint = 0n;
  for (const num of uniqueNumbers) {
    totalSum += BigInt(num);
  }

  // 結果を出力
  console.log(`count=${count} sum=${totalSum.toString()}`);
});
