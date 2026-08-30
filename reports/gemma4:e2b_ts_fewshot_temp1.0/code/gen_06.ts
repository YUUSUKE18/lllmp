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
  let sum: bigint = 0n;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能かチェック
    if (!Number.isNaN(num)) {
      // 64bit整数の範囲内であると仮定し、Setに追加して重複を排除
      uniqueNumbers.add(num);
    }
  }

  // 重複を除いた個数と合計を計算
  let count = uniqueNumbers.size;
  let totalSum: bigint = 0n;

  for (const num of uniqueNumbers) {
    totalSum += BigInt(num);
  }

  console.log(`count=${count} sum=${totalSum}`);
});
