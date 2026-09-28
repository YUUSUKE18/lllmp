const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  const nums: number[] = [];

  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.trim().split(/\s+/);
    if (parts.length === 1) {
      const val = parseInt(parts[0], 10);
      if (!Number.isNaN(val)) {
        target = val;
        break;
      }
    } else {
      for (const p of parts) {
        const n = parseInt(p, 10);
        if (!Number.isNaN(n)) {
          nums.push(n);
        }
      }
    }
  }

  if (target === null || nums.length < 2) {
    console.log("pairs=0");
    return;
  }

  let count = 0n;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (BigInt(nums[i]) + BigInt(nums[j]) === BigInt(target)) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
