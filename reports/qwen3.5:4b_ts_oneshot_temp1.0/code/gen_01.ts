const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const uniqueNumbers = new Set<string>();

  for (const p of parts) {
    const trimmed = p.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    // Ensure the number is finite and integer (handles cases like "1.5")
    if (!Number.isFinite(n) || Number.isInteger(n)) {
      uniqueNumbers.add(String(n));
    }
  }

  const sortedUnique = Array.from(uniqueNumbers).map(Number).sort((a, b) => a - b);
  
  let totalSum: bigint = 0n;
  
  for (const numStr of sortedUnique) {
    const n = parseInt(numStr, 10);
    // Count occurrences manually
    let count = 0;
    for (const p of parts) {
      const trimmed = p.trim();
      if (trimmed === "") continue;
      const parsed = parseInt(trimmed, 10);
      if (!Number.isNaN(parsed) && Number.isFinite(parsed) && Number.isInteger(parsed)) {
        if (parsed === n) {
          count++;
          totalSum += BigInt(n);
        }
      }
    }
  }

  console.log(`count=${uniqueNumbers.size} sum=${totalSum}`);
});
