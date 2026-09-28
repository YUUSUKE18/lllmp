const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const uniqueNumbers = new Set<number>();
  let sum = 0n; // Using BigInt for safety, though problem guarantees 64-bit range.

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;

    const n = parseInt(trimmed, 10);
    if (isNaN(n)) continue;

    uniqueNumbers.add(n);
    sum += BigInt(n);
  }

  console.log(`count=${uniqueNumbers.size} sum=${sum}`);
});
