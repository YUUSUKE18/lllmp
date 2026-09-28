const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let targetVal: number | null = null;
  let nums: bigint[] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.trim().split(/\s+/);
    if (parts.length === 1) {
      const val = BigInt(parts[0]);
      try {
        targetVal = parseInt(String(val), 10);
      } catch (e) {}
    } else if (parts.length > 1) {
      for (const p of parts) {
        const v = BigInt(p);
        try {
          nums.push(parseInt(String(v), 10));
        } catch (e) {}
      }
    }
  }

  if (!targetVal || nums.length === 0) {
    console.log("pairs=0");
    return;
  }

  let pairs = 0n;
  const sortedNums = nums.sort((a, b) => a - b);

  for (let i = 0; i < sortedNums.length; i++) {
    for (let j = i + 1; j < sortedNums.length; j++) {
      const sum = sortedNums[i] + sortedNums[j];
      if (sum === BigInt(targetVal)) {
        pairs++;
      }
    }
  }

  console.log(`pairs=${pairs}`);
});
