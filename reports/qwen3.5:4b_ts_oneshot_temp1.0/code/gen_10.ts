const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Set<number>();
  let totalSum = 0n; // Initialize with BigInt for 64-bit range safety
  const trimmedParts = s.split(/\s+/);

  for (const part of trimmedParts) {
    if (part === "") continue;
    const n = parseInt(part, 10);
    if (Number.isNaN(n)) continue;
    const num = Number(n); // Ensure we use the same number type for consistency before conversion
    if (!Number.isInteger(num)) continue;

    if (nums.has(num)) {
      totalSum += BigInt(num);
    } else {
      nums.add(num);
      totalSum += BigInt(num);
    }
  }

  console.log(`count=${nums.size} sum=${totalSum}`);
});
