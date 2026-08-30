const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  const nums: number[] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.trim().split(/\s+/);
    if (parts.length === 1 && !isNaN(Number(parts[0]))) {
      target = Number(parts[0]);
    } else if (parts.length > 1 || (parts.length === 1 && isNaN(Number(parts[0])))) {
      for (const p of parts) {
        const n = Number(p);
        if (!isNaN(n)) {
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
  const nLen = nums.length;
  for (let i = 0; i < nLen; i++) {
    for (let j = i + 1; j < nLen; j++) {
      if (BigInt(nums[i]) + BigInt(nums[j]) === BigInt(target)) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
