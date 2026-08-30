const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const uniqueNumbers = new Set<number>();
  let sum: bigint = 0n;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!Number.isNaN(num)) {
      // 64bit整数として扱うため、BigIntで管理
      uniqueNumbers.add(num);
    }
  }

  let count = uniqueNumbers.size;
  let totalSum = 0n;

  for (const num of uniqueNumbers) {
    totalSum += BigInt(num);
  }

  console.log(`count=${count} sum=${totalSum}`);
});
