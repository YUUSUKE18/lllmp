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

    // 整数として解釈可能かチェックし、Setに追加
    const num = parseInt(trimmedPart, 10);
    if (!Number.isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  let count = uniqueNumbers.size;
  let totalSum = 0n;

  for (const num of uniqueNumbers) {
    totalSum += BigInt(num);
  }

  console.log(`count=${count} sum=${totalSum.toString()}`);
});
