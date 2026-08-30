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
      uniqueNumbers.add(num);
    }
  }

  for (const num of uniqueNumbers) {
    sum += BigInt(num);
  }

  console.log(`count=${uniqueNumbers.size} sum=${sum.toString()}`);
});
